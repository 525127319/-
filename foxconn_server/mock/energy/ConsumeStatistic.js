const ConsumeStatistic=require('../../api/energy/EnergyStasticService')
const CurEnvRecord=require('../../api/energy/EnergyService')
const moment = require('moment');
let maxID

function formatTime(date){
    let seconds=date.getTime();
    return parseInt(seconds/1000)
}
 
function  insertStatic() {
        let time = new Date(new Date().toLocaleDateString()).getTime() ;
            time= Math.round(time/1000)
        let now = formatTime(new Date())
        let last = time - 86400;
        let today=new Date(time*1000)
        let yesToday=new Date(last*1000)
 
        if(now===time){
            ConsumeStatistic.count().then(async res=>{
                maxID=res+1;
                let  avg1 = await CurEnvRecord.average('Value',{Type:0,UpdateTime:{$gte:yesToday}});
                let  avg2 = await CurEnvRecord.average('Value',{Type:1,UpdateTime:{$gte:yesToday}});
                let  avg3 = await  CurEnvRecord.average('Value',{Type:2,UpdateTime:{$gte:yesToday}});
                let  avg4 =  await CurEnvRecord.average('Value',{Type:3,UpdateTime:{$gte:yesToday}});
                let  sum1= await    CurEnvRecord.sum('Value',{Type:4,UpdateTime:{$gte:yesToday}});
                let  sum2=  await  CurEnvRecord.sum('Value',{Type:5,UpdateTime:{$gte:yesToday}});
                
                ConsumeStatistic.create({
                    ID:maxID,
                    TotalConsumePower:parseInt(sum1),
                    TotalConsumeGas:parseInt(sum2),
                    AvgConsumeTemperature:parseInt(avg1),
                    AvgConsumeHumidity:parseInt(avg2),
                    AvgConsumeNoise:parseInt(avg3),
                    AvgConsumePm:parseInt(avg4)
                })
                // console.log( maxID,
                //         sum1,
                //         sum2,
                //         avg1,
                //         avg2,
                //         avg3,
                //         avg4,
                //         yesToday,
                //         today
                //        )
            })
        }



}

function energyStatic(){
    setInterval(()=>{
        insertStatic()
    },1000)
}

module.exports=energyStatic;