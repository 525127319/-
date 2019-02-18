const ProductConfigurationService=require('../../api/product/ProductConfigurationService')
 let id=1
 let defaultDate=[
     { ID:1 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M1' , StationID:'M1' , WorkstationStatus:0 },
     { ID:2 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M2' , StationID:'M2' , WorkstationStatus:0 },
     { ID:3 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M3' , StationID:'M3' , WorkstationStatus:0 },
     { ID:4 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M4' , StationID:'M4' , WorkstationStatus:0 },
     { ID:5 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M5' , StationID:'M5' , WorkstationStatus:0 },
     { ID:6 , LineName:'product' , CellName:'Cell1' , StationCode:'TEST' ,WorkstationOrder:'M6' , StationID:'M6' , WorkstationStatus:0 },
     { ID:7 , LineName:'product' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M7' , StationID:'M1' , WorkstationStatus:0 },
     { ID:8 , LineName:'product' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M8' , StationID:'M2' , WorkstationStatus:0 },
     { ID:9 , LineName:'product' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M9' , StationID:'M3' , WorkstationStatus:0 },
     { ID:10 , LineName:'product' , CellName:'Cell2' , StationCode:'TEST' ,WorkstationOrder:'M10' , StationID:'M4' , WorkstationStatus:0 },
     { ID:11 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M11' , StationID:'M1' , WorkstationStatus:0 },
     { ID:12 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M12' , StationID:'M2' , WorkstationStatus:0 },
     { ID:13 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M13' , StationID:'M3' , WorkstationStatus:0 },
     { ID:14 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M14' , StationID:'M4' , WorkstationStatus:0 },
     { ID:15 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M15' , StationID:'M5' , WorkstationStatus:0 },
     { ID:16 , LineName:'product' , CellName:'Cell3' , StationCode:'TEST' ,WorkstationOrder:'M16' , StationID:'M6' , WorkstationStatus:0 },
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
    ProductConfigurationService.count().then(async res=>{
        if(res===16){
            ProductConfigurationService.update({
                ID:id,
                WorkstationStatus:GetRandomNum(0,1),
                UpdateTime:new Date()
                },{ID:id}) 
            
            id++
            if(id===17){
                id=1
            }
        }else{
            ProductConfigurationService.destroyByCondition({ID:{$gt:0}}).then(
                defaultDate.forEach(item=>{
                    ProductConfigurationService.create(item)
                })
            )
        }
    })

 
}

function productConfig(){
    setInterval(()=>{upDateCongig()},1000)
}

module.exports=productConfig