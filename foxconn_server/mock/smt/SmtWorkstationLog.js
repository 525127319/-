
const SmtWorkstationLogService=require('../../api/smt/SmtWorkstationLogService')
let id=1
let status=['工作','空闲','异常']
let good=5000
let deafultData=[
     {ID:1,WorkstationNo:'M1' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:2,WorkstationNo:'M2' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:3,WorkstationNo:'M3' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:4,WorkstationNo:'M4' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:5,WorkstationNo:'M5' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:6,WorkstationNo:'M6' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:7,WorkstationNo:'M7' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:8,WorkstationNo:'M8' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:9,WorkstationNo:'M9' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:10,WorkstationNo:'M10' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:11,WorkstationNo:'M11' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:12,WorkstationNo:'M12' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:13,WorkstationNo:'M13' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:14,WorkstationNo:'M14' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:15,WorkstationNo:'M15' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
     {ID:16,WorkstationNo:'M16' , CurStatus : '空闲 ' , StationGroup:'group' , TestType:'Test',TestCountTime:4,FinishedNum:5000,YieldNumber:5000,Inferior:0},
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

function upDateLogs(){

       SmtWorkstationLogService.count().then(res=>{
        if(res===16){
            good+=GetRandomNum(3,5)
            SmtWorkstationLogService.update({
                ID:id,
                CurStatus:status[GetRandomNum(0,2)],
                TestCountTime:GetRandomNum(3,5),
                FinishedNum:good,
                YieldNumber:good-GetRandomNum(50,100),
                Inferior:GetRandomNum(50,100),
                UpdateTime:new Date()
                }
                ,{ID:id}
                ) 
            id++
            if(id===17){
                id=1
            }
        }else{
            SmtWorkstationLogService.destroyByCondition({ID:{$gt:0}}).then(
                deafultData.forEach(item=>{
                    SmtWorkstationLogService.create(item)
                })
            )
        }
    })
}

function smtLogs(){
    setInterval(()=>{upDateLogs()},1000)

}

module.exports=smtLogs