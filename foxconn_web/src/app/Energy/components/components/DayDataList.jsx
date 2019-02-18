import React ,{Component} from 'react'
import echarts from 'echarts'
import AxiosHttp from "@/utils/AxiosHttp";
let timer=null;
export default class DayDataList extends Component{
    constructor(props){
        super(props);
        this.state={
            daydata:[
                {   
                    id:'temp2',
                    name:'当前温度',
                    val:"0",
                    unit:'°C'
                },
                {   
                    id:'hum2',
                    name:'当前湿度',
                    val:"0",
                    unit:'%'
                },
                {
                    id:'nois2',
                    name:'当前噪音 ',
                    val:"0",
                    unit:'dB'
                },
                {
                    id:'pm2',
                    name:'当前PM2.5',
                    val:"0",
                    unit:'μg/m³'
                }
            ]
        };
    }

initCharts=()=>{
    let option;
    this.state.daydata.map(item=>{
        option=   {
            series: [{
                name: "指标",
                type: "gauge",
                startAngle: 180, //总的360，设置180就是半圆
                endAngle: 0,
                center: ["50%", "85%"], //整体的位置设置
                radius: 70,
                axisLine: {
                    lineStyle: {
                        width: 10, //柱子的宽度
                        color: [[item.val*0.01, "#0072e9"], [1, "#262d56"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                pointer: {
                    width: 5, //指针的宽度
                    length: "60%", //指针长度，按照半圆半径的百分比
                    color: "#f95386"
                },
                itemStyle:{
                    normal:{
                        color:'#f95386',
                        borderWidth:0
                    }
                    },
                title: {
                    "show": false,
                     
                },
                detail: {
                    show: false
                },
                data: [{ //显示数据
                    value: item.val,
                    name: "你要的比例 29.8%"
                }]
            }]
        }
        let drawCharts=echarts.init(document.getElementById(item.id))
        drawCharts.setOption(option);
        return ''
    })
}
handelDatas=(res)=>{
    let data=[];
    res.value.forEach(item => {
        let items={  }
            if(item.rows[0].Type === 0){
                items={
                    id:'temp2',
                    name:'当前温度',
                    val:item.rows[0].Value,
                    unit:'°C'}
            }else if (item.rows[0].Type === 1){
                items={
                id:'hum2',
                name:'当前湿度',
                val:item.rows[0].Value,
                unit:'%'}
            }else if (item.rows[0].Type === 2){
                items={
                    id:'nois2',
                    name:'当前噪音',
                    val:item.rows[0].Value,
                    unit:'dB'}
     
            }else if (item.rows[0].Type === 3){
                items={
                    id:'pm2',
                    name:'当前PM2.5',
                    val:item.rows[0].Value,
                    unit:'μg/m³'}
            }
            data.push(items);
 
    });
    this.setState({daydata:data},()=>{
     
        this.initCharts()
    })
}
getLastDatas=()=>{
    AxiosHttp.post('/environmentAndEnergy/realTimeDataQuery').then(
       this.handelDatas
    ).catch((error) => {
        console.log(error);
    });
}
 
componentDidMount(){
    this.getLastDatas()
  timer=  setInterval( 
        ()=>{
            if(!document.hidden&&window.location.hash==='#/'){
            this.getLastDatas()
        }
    },2000)
    
}
componentWillUnmount(){
    clearInterval(timer)
}

    render(){
        return(
            <ul className='day-data-list'>
               {
                this.state.daydata.map(item=>{
                    return (
                        <li 
                        key={item.unit}>
                            <div className='gauge' id={item.id}></div>
                            <div className='val-del'>
                                <div className='val'>
                                    <p>
                                    {item.val||0}
                                    </p>
                                    <span>
                                        {item.unit}
                                    </span>
                                </div>
                                <p className='text'>
                                    {item.name}
                                </p>
                            </div>
                        </li>
                    )
                })
               }
            </ul>
        )
    }
}