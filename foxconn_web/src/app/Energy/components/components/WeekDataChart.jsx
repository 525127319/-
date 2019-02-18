import React ,{Component} from 'react'
import echarts from 'echarts'
import AxiosHttp from "@/utils/AxiosHttp";
let timer=null;
let timer1=null
export default class WeekDataChart extends Component{
    constructor(props){
        super(props);
        this.state={
            datas:[],
            todayData:[]
        }
    }
    handlWeekData=(res)=>{
        
        let itemsData={
            electric:[],
            gas:[],
            temp:[],
            hum:[],
            pm:[],
            noise:[],
            times:[]
        }
        res.value.rows.forEach(item => {
            itemsData.electric.unshift(item.TotalConsumePower);
            itemsData.gas.unshift(item.TotalConsumeGas);
            itemsData.temp.unshift(item.AvgConsumeTemperature);
            itemsData.hum.unshift(item.AvgConsumeHumidity);
            itemsData.pm.unshift(item.AvgConsumePm);
            itemsData.noise.unshift(item.AvgConsumeNoise);
            itemsData.times.unshift(this.formatDate(item.UpdateTime));
        });
        
        this.setState({datas:[
            {
                title:'近一周用电量用气趋势', //图表标题
                id:'electr' ,
                unitL:'kw/h',
                yMaxL:200000 ,// Y轴最大值
                yMinL:0,//Y轴最小值
                intervalL:50000,//刻度间隔值
                xData:itemsData.times,//时间
                dataL: itemsData.electric, //渲染数据
                legend:['用电','用气'],
                unitR:'m³',
                yMaxR:100000 ,// Y轴最大值
                yMinR:0,//Y轴最小值
                intervalR:25000,
                dataR:itemsData.gas //渲染数据
            },
            {
                title:'近一周温度湿度趋势', //图表标题
                id:'temp' ,
                unitL:'°C',
                yMaxL:32 ,// Y轴最大值
                yMinL:20,//Y轴最小值
                intervalL:3,
                xData:itemsData.times,//时间
                dataL:itemsData.temp, //渲染数据
                legend:['温度','湿度'],
                unitR:'%',
                yMaxR:100 ,// Y轴最大值
                yMinR:0,//Y轴最小值
                intervalR:25,
                dataR:itemsData.hum //渲染数据
            },
            {
                title:'近一周噪音、PM2.5趋势', //图表标题
                id:'pm' ,
                unitL:'dB',
                yMaxL:80 ,// Y轴最大值
                yMinL:40,//Y轴最小值
                intervalL:10,
                dataL:itemsData.noise ,//渲染数据
                legend:['噪音','PM2.5'],
                unitR:'μg/m³',
                yMaxR:120 ,// Y轴最大值
                yMinR:0,//Y轴最小值
                intervalR:30,
                xData:itemsData.times,//时间
                dataR:itemsData.pm, //渲染数据
              
                 
            }
        ]},()=>{
            this.initCharts()
        })
    }
    formatDate=(date)=>{
        let tt=new Date(date);
        let mm=tt.getMonth()+1;
        let dd=tt.getDate();
        return `${mm}.${dd}`
    }
    getWeekData=()=>{
        AxiosHttp.post('/environmentAndEnergy/dataQueryForTheLastWeek')
        .then(
            this.handlWeekData
        )
        .catch(err=>{
            console.log(err)
        })
    }
    
    getTodayData=()=>{
        AxiosHttp.post('/environmentAndEnergy/todayEnvironmentAndEnergyQuerying')
        .then(
            this.handleTodayData
        )
        .catch(err=>{
            console.log(err)
        })
    }

    handleTodayData=(res)=>{
        this.setState({todayData:[
            {
                textL:'今日用电量',
                averangeL:res.value[4],
                unitL:'kw/h',
                textR:'今日用气量 ',
                averangeR:res.value[5],
                unitR:'m³'
            },
            {
                unitL:'°C',
                textL:'今日平均温度',
                averangeL: res.value[0],
                unitR:'%',
                textR:'今日平均湿度',
                averangeR:res.value[1]
            },
            {
                unitL:'dB',
                textL:'今日平均噪音',
                averangeL:res.value[2],
                unitR:'μg/m³',
                textR:'今日平均PM2.5',
                averangeR:res.value[3]
            }
        ]})
        
    }
    
    initCharts=()=>{
        this.state.datas.map(item=>{
            let options= {
 
                grid:{
                    left:15,
                    top:40,
                    bottom:0,
                    right:15,
                    containLabel:true
                },
                xAxis: {
                    data: item.xData,
                    boundaryGap:false,
                    axisLine:{
                        lineStyle: {
                            color: '#4c506a'
                        }
                    },
                     axisLabel: {
                        textStyle: {
                            color: 'rgba(255,255,255, 0.56)'
                        }  
                    },
                    axisTick:{
                        show:false
                    }
                },
                yAxis: [
                    { 
                        name:`单位(${item.unitL})`,
                        min:item.yMinL,
                        max:item.yMaxL,
                        interval:item.intervalL,
                        nameTextStyle:{
                            color:'rgba(255, 255, 255,  0.64)'  ,
                            verticalAlign:'top',
                            left:15
                        },
                        ayisLine:{
                            show:false
                        },
                         axisLabel: {
                            textStyle: {
                                color: 'rgba(255, 255, 255,  0.40)'
                            }  
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#192363'
                            }
                        },
                        axisLine: {
                                lineStyle: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            }
                    }, { 
                        name:`单位(${item.unitR})`,
                        min:item.yMinR,
                        max:item.yMaxR,
                        interval:item.intervalR,
                        nameTextStyle:{
                            color:'rgba(255, 255, 255,  0.64)'  ,
                            verticalAlign:'top',
                            left:15
                        },
                        ayisLine:{
                            show:false
                        },
                         axisLabel: {
                            textStyle: {
                                color: 'rgba(255, 255, 255,  0.40)'
                            }  
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'#192363'
                            }
                        },
                        axisLine: {
                                lineStyle: {
                                    color: 'rgba(0,0,0,0)'
                                }
                            }
                    }
                ],
                
                series: [
                    {
                        type: 'line',
                        data:item.dataL,
                        "symbol":"circle",
                        itemStyle:{
                            normal:{
                                color:'#0072e9',
                                opacity:1,
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:1.5,
                                color:'#0072e9',
                                opacity:1
                            }
                        }
                    },
                    {
                        type: 'line',
                        data:item.dataR,
                        "symbol":"circle",
                        "yAxisIndex": 1,
                        itemStyle:{
                            normal:{
                                color:'#71f4ff',
                                opacity:1,
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:1.5,
                                color:'#71f4ff',
                                opacity:1
                            }
                        }
                    }
   
                ]
            };
            let drawChart=echarts.init(document.getElementById(item.id));
                drawChart.setOption(options);
                return ''
        })
    }
 

componentDidMount(){
    this.getWeekData();
    this.getTodayData();
    timer=setInterval(()=>{
        if(!document.hidden&&window.location.hash==='#/'){
            this.getWeekData();
        }
    },3600000);
    timer1=setInterval(()=>{
        if(!document.hidden&&window.location.hash==='#/'){
        this.getTodayData();
    }
    },2000)
}
componentWillUnmount(){
    clearInterval(timer);
    clearInterval(timer1);

}
    render(){
        return(
        <div  className='week-data-chart'>
            <ul  className='chart'>
                {
                    this.state.datas.map(item=>{
                        return (
                            <li key={item.id}>
                                <p className='item-title'>
                                    {item.title}
                                </p>
                                <ul className='legend'>
                                    <li>{item.legend[0]}</li>
                                    <li>{item.legend[1]}</li>
                                </ul>
                                <div id={item.id} className='item-canvas'> </div>
                            </li>
                        )
                    })
                }
            </ul>
            <ul className='today-mess'>
                {
                    this.state.todayData.map(item=>{
                        return(
                        <li key={item.unitL}>
                            <p className='d-left'>
                                {item.textL}
                                    <span className='num'>
                                        {item.averangeL}
                                    </span>
                                {item.unitL}
                            </p>
                            <p className='d-right'>
                                {item.textR}
                                    <span className='num'>
                                        {item.averangeR}
                                    </span>
                                {item.unitR}
                            </p>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
        )
    }
}