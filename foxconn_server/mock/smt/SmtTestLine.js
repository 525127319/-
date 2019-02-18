const SmtTestLineService=require('../../api/smt/SmtTestLineService')
 
function formatTime(date){
    let seconds=date.getTime();
    return parseInt(seconds/1000)
}
 
function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return ((Min + Math.round(Rand * Range)));
};

function upDateTestLine(){
    SmtTestLineService.count().then(res=>{
        if(res===1){
        SmtTestLineService.update({
            ID:1,
            FactoryName:'foxconn',
            WorkOrderNo:'ORDER0001',
            ProductName:'DEFAULT',
            IncoundCount:50000,
            OutCount:GetRandomNum(49800,50000),
            LineOncePassedRate:GetRandomNum(90,100),
            YieldNumber:GetRandomNum(48800,49800),
            Yield:GetRandomNum(90,100),
            Uph:GetRandomNum(200,300),
            UpdateTime:new Date()
    },{ID:1}) 
        }else{
            SmtTestLineService.create({
                ID:1,
                LineName:'smt',
                FactoryName:'foxconn',
                WorkOrderNo:'ORDER0001',
                ProductName:'DEFAULT',
                IncoundCount:50000,
                OutCount:GetRandomNum(49800,50000),
                LineOncePassedRate:GetRandomNum(90,100),
                YieldNumber:GetRandomNum(48800,49800),
                Yield:GetRandomNum(90,100),
                Uph:GetRandomNum(200,300)
            })
        }
    })
        
}

function smtTest(){
    setInterval(()=>{upDateTestLine()},10000)
}

module.exports=smtTest
