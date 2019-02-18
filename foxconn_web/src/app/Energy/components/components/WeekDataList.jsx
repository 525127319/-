import React ,{Component} from 'react'
import AxiosHttp from "@/utils/AxiosHttp";
let timer=null;

export default class WeekDataList extends Component{
    constructor(props){
        super(props);
        this.state={
            daydata:[]
        };
    }
    handlWeekData=(res)=>{
        console.log(res)
        let itemsData={
            electric:[],
            gas:[],
            temp:[],
            hum:[],
            pm:[],
            noise:[]
        }
        res.value.rows.forEach(item => {
            itemsData.electric.unshift(item.TotalConsumePower);
            itemsData.gas.unshift(item.TotalConsumeGas);
            itemsData.temp.unshift(item.AvgConsumeTemperature);
            itemsData.hum.unshift(item.AvgConsumeHumidity);
            itemsData.pm.unshift(item.AvgConsumePm);
            itemsData.noise.unshift(item.AvgConsumeNoise);
        });
        let avgData={
            avgElec:this.getAverange(itemsData.electric),
            avgGas:this.getAverange(itemsData.gas),
            avgTemp:this.getAverange(itemsData.temp),
            avgHum:this.getAverange(itemsData.hum),
            avgPm:this.getAverange(itemsData.pm),
            avgNoise:this.getAverange(itemsData.noise),
        }
        this.setState({daydata:[                {
            name:'近一周平均每日用电',
            val:avgData.avgElec,
            unit:'kw/h'
        },
        {
            name:'近一周平均每日用气',
            val:avgData.avgGas,
            unit:'m³'
        },
        {
            name:'近一周平均温度 ',
            val:avgData.avgTemp,
            unit:'°C'
        },
        {
            name:'近一周平均湿度 ',
            val:avgData.avgHum,
            unit:'%'
        },
        {
            name:'近一周平均PM2.5 ',
            val:avgData.avgPm,
            unit:'μg/m³'
        },
        {
            name:'近一周平均噪音',
            val:avgData.avgNoise,
            unit:'dB'
        },]})
    }
    getAverange=(arr)=>{
        let sum=0;
        for(let i=0;i<arr.length;i++){
            sum+=arr[i]
        }
        return (Math.round(sum/arr.length))
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

    componentDidMount(){
        this.getWeekData()
       timer= setInterval(()=>{
           if(!document.hidden&&window.location.hash==='#/'){
               this.getWeekData()
           }
       },360000)
    }
    componentWillUnmount(){
        clearInterval(timer)
    }


    render(){
        return(
            <ul className='week-data-list'>
               {
                this.state.daydata.map(item=>{
                    return (
                        <li 
                        key={item.name}>
                             <p className='text'>
                                {item.name}
                            </p>
                            <div className='val'>
                                <p>
                                {item.val||0}
                                </p>
                                <span>
                                    {item.unit}
                                </span>
                            </div>
                         
                        </li>
                    )
                })
               }
            </ul>
        )
    }
}