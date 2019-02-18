const SmtKpiServer=require('../../api/smt/SmtKpiService')
 
function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return ((Min + Math.round(Rand * Range)));
};

function upDateKPI(){
    

            SmtKpiServer.count().then(res=>{
        if(res===1){
            SmtKpiServer.update({
                ID:1,
                UPHKPI:GetRandomNum(190,200),
                YieldNumberKPI:GetRandomNum(190,200),
                InferiorKPI:GetRandomNum(0,10),
                YieldKPI:GetRandomNum(95,100),
                LineOncePassedKPI:GetRandomNum(95,100),
                StationOncePassedKPI:GetRandomNum(98,100),
                WorkstationYieldKPI:GetRandomNum(190,200),
                WorkstationInferiorKPI:GetRandomNum(0,10),
                UpdateTime:new Date()
                }
                ,{ID:1}
                )
        }else{
            SmtKpiServer.create({
                ID:1,
                LineName:'Smt',
                UPHKPI:GetRandomNum(190,200),
                YieldNumberKPI:GetRandomNum(190,200),
                InferiorKPI:GetRandomNum(0,10),
                YieldKPI:GetRandomNum(95,100),
                LineOncePassedKPI:GetRandomNum(95,100),
                StationOncePassedKPI:GetRandomNum(98,100),
                WorkstationYieldKPI:GetRandomNum(190,200),
                WorkstationInferiorKPI:GetRandomNum(0,10),
                UpdateTime:new Date()
                })
        }
    })
     
}

function smtKpi(){
    setInterval(()=>{upDateKPI()},10000)

}

module.exports=smtKpi