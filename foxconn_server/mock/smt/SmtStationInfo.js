const SmtStationInfoService=require('../../api/smt/SmtStationInfoService')
 let id=1
  let defaultData=[
     {ID:1 , StationGroup : 'CAL' , StationOncePassedRate :100},
     {ID:2 , StationGroup : 'RF' , StationOncePassedRate :100},
     {ID:3 , StationGroup : 'WIFIBT' , StationOncePassedRate :100},
     {ID:4 , StationGroup : 'IDLE' , StationOncePassedRate :100},
     {ID:5 , StationGroup : 'ANT' , StationOncePassedRate :100},
     {ID:6 , StationGroup : 'CAT' , StationOncePassedRate :100},
     {ID:7 , StationGroup : 'AUDIO' , StationOncePassedRate :100}
 ]
function formatTime(date){
    let seconds=date.getTime();
    return parseInt(seconds/1000)
}
 
function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return ((Min + Math.round(Rand * Range)));
};

function upDatePassedRate(){
  


    SmtStationInfoService.count().then(res=>{
    if(res===7){
        SmtStationInfoService.update(
            {ID:id,StationOncePassedRate:GetRandomNum(90,100),
            UpdateTime:new Date()},{ID:id}) 
        id++
        if(id===8){
            id=1
        }
    }else{
        SmtStationInfoService.destroyByCondition({ID:{$gt:0}}).then(
                defaultData.forEach(item=>{
                    SmtStationInfoService.create(item)
                })
            )
    }
})
}

function smtPass(){
    setInterval(()=>{upDatePassedRate()},1000)

}
module.exports=smtPass
