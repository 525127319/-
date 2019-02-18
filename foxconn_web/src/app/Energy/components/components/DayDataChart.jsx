import React ,{Component} from 'react'
import echarts from 'echarts'
import AxiosHttp from "@/utils/AxiosHttp";
import moment from 'moment'
let timer=null;

export default class DayDataChart extends Component{
    constructor(props){
        super(props);
        this.state={
            dayData:[ ]
        }
    }
    initCharts=()=>{
        let options;
        this.state.dayData.map(item=>{
            options= {
                grid: {
                    left: 20,
                    right: 50,
                    bottom: 16,
                    top:32,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#4c506a'
                        }
                    },
                    axisLabel: {
                        interval:9,
                        textStyle: {
                            color: 'rgba(255,255,255,0.56)'
                        }
                    },
                    data: item.times
                }],
                yAxis: [{
                    type: 'value',
                    name:`单位(${item.unit})`,
                    min:item.yMin,
                    max:item.yMax,
                    interval:item.interval,
                    nameTextStyle:{
                        color:'rgba(255, 255, 255, 0.64)'  ,
                        verticalAlign:'top',
                        left:0
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255,0.40)'
                        }  
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'#1e2865'
                        }
                    },
                }],
                series: [{
                    type: 'line',
                    smooth: false,
                    symbol: 'circle',
                    symbolSize: 0.5,
                    showSymbol: true,
                    markLine :{
                        itemStyle:{
                            normal:{ label:{show:true }}
                            },
                                                    
         
                        data : [
                                {type : 'average', name: '平均值'}
                            ]
                    },
      
                    label:{
                        normal: {
                            show: false,
                            position: 'top',
                            color:item.color,
                            fontSize:14
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset:0.2,
                                color: item.color
                            }, {
                                offset: 1,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            // shadowColor: 'rgba(0, 0, 0, 0.1)',
                            // shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: item.color,
                            borderColor: item.color,
                            borderWidth: 1
                        }
                    },
   
                    data: item.datas
                }, ]
            };
     
                let drawCharts=echarts.init(document.getElementById(item.id));
                drawCharts.setOption(options);
                return ''
        })
 
    }
    handleDayData=(res)=>{
         let datas=[];
            res.value.forEach(items=>{
                let itemData={
                    times:[],
                    values:[]
                }
                items.rows.forEach(item=>{
                        itemData.times.unshift(this.forMateTime(item.UpdateTime));
                        itemData.values.unshift(item.Value);
                })
                datas.push(itemData)
            })
            this.setState({dayData:[  {
                id:'elec', //ID
                unit:'kw/h' ,//单位
                // yMax:100 ,//Y轴最大值
                // yMin:20,//Y轴最小值
                // interval:10,
                title:'近24小时用电量趋势',
                times:datas[0].times ,
                datas:datas[0].values ,
                color:'rgb(0,144,233)',
                opacity:'rgba(0,144,233,0.4)'
            },
            {
                id:'gas',
                unit:'m³',
                // yMax:80 ,//Y轴最大值
                // yMin:0,//Y轴最小值
                // interval:10,
                title:'近24小时用气量趋势',
                times:datas[1].times ,
                datas:datas[1].values ,
                color:'rgb(113,244,255)',
                opacity:'rgba(113,244,255,0.4)'
                
            }]},()=>{
                this.initCharts()
                // console.log(this.state.dayData)
            })
         

    }
    // 2018-09-12T11:03:51.620Z
    forMateTime=(time)=>{
        let date=new Date((time.split('.'))[0]);
        let hour= date.getHours();
        let min=date.getMinutes();
        hour=this.toDouble(hour)
        min=this.toDouble(min)
        return `${hour}:${min}`
    }
    toDouble=(num)=>{
        if(num<10){
            return    num='0'+num
        }else{
            return num
        }

    }
    getLastOneDayData=()=>{
        AxiosHttp.post('/environmentAndEnergy/dataQueryForNearly24Hours')
        .then(this.handleDayData)
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.getLastOneDayData()
        timer=setInterval( ()=>{
            if(!document.hidden&&window.location.hash==='#/')    
            this.getLastOneDayData()
        },180000)
       
    }
    componentWillUnmount(){
        clearInterval(timer);
    }
    render(){
        return(
            <ul className='day-data-chart'>
               {
                   this.state.dayData.map(item=>{
                       return(
                           <li 
                            key={item.id}
                           >
                            <p className='item-title'>
                                {item.title}
                            </p>
                            <div  id={item.id} className='item-canvas'></div>
                            </li>
                       )
                   })
               }
            </ul>   
        )
    }
}