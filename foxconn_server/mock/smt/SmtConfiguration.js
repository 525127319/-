const SmtConfigurationServer=require('../../api/smt/SmtConfigurationService')
 let id=1
  let defaultDate=[
     { ID:1 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M1' , StationID:'M1' , WorkstationStatus:0 },
     { ID:2 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M2' , StationID:'M2' , WorkstationStatus:0 },
     { ID:3 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M3' , StationID:'M3' , WorkstationStatus:0 },
     { ID:4 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M4' , StationID:'M4' , WorkstationStatus:0 },
     { ID:5 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M5' , StationID:'M5' , WorkstationStatus:0 },
     { ID:6 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M6' , StationID:'M6' , WorkstationStatus:0 },
     { ID:7 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M7' , StationID:'M7' , WorkstationStatus:0 },
     { ID:8 , LineName:'smt' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M8' , StationID:'M8' , WorkstationStatus:0 },
     { ID:9 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M9' , StationID:'M1' , WorkstationStatus:0 },
     { ID:10 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M10' , StationID:'M2' , WorkstationStatus:0 },
     { ID:11 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M11' , StationID:'M3' , WorkstationStatus:0 },
     { ID:12 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M12' , StationID:'M4' , WorkstationStatus:0 },
     { ID:13 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M13' , StationID:'M5' , WorkstationStatus:0 },
     { ID:14 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M14' , StationID:'M6' , WorkstationStatus:0 },
     { ID:15 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M15' , StationID:'M7' , WorkstationStatus:0 },
     { ID:16 , LineName:'smt' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M16' , StationID:'M8' , WorkstationStatus:0 },
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

function upDateCongig(){
    SmtConfigurationServer.count().then(res=>{
        if(res===16){
            SmtConfigurationServer.update(
                    {ID:id,
                    WorkstationStatus:GetRandomNum(0,1),
                    UpdateTime:new Date()},
                    {ID:id}
                ) 
            id++
            if(id===17){
                id=1
            }
        }else{
            SmtConfigurationServer.destroyByCondition({ID:{$gt:0}}).then(
                defaultDate.forEach(item=>{
                    SmtConfigurationServer.create(item)
                })
            )
        }
    })

}

function smtConfig(){
    setInterval(()=>{upDateCongig()},1000)

}

module.exports=smtConfig

