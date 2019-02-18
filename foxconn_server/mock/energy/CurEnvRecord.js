const EventEmitter = require('events').EventEmitter; 
const event = new EventEmitter(); 
const EnergyServer=require('../../api/energy/EnergyService')
let maxID
let a=0;
let b= 4 ;
let values=0;
function formatTime(date){
    let seconds=date.getTime();
    return parseInt(seconds/1000)
}

function GetRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return ((Min + Math.round(Rand * Range)));
};
 

function insertData(category) {
    EnergyServer.count().then(res=>{
        maxID=res+1
        switch (category) {
            case 0:
                values = GetRandomNum(20, 32);
                break;
            case 1:
                values = GetRandomNum(40, 75);
                break;
            case 2:
                values = GetRandomNum(40, 90);
                break;
            case 3:
                values = GetRandomNum(10, 80);
                break;
            case 4:
                values = GetRandomNum(50, 100);
                break;
            case 5:
                values = GetRandomNum(0, 50);
                break;
        }
        EnergyServer.create({
            ID:maxID,
            Type:category,
            Value:values
            })
           
})
}

event.on('timer',(type)=>{
    if(type===1){
        insertData(a)
        if(a===0){
            a=1
        }else if(a===1){
            a=2
        }else if(a===2){
            a=3
        }else if(a===3){
            a=0
        }
    }else if(type===2){
        insertData(b)
        if(b===4){
            b=5
        }else if(b===5){
            b=4
        }
    }
   
})
 
function energyRecord(){
    setInterval(()=>{event.emit('timer',1)},2000)
    
    setInterval(()=>{event.emit('timer',2)},180000) 
}

module.exports=energyRecord


 

