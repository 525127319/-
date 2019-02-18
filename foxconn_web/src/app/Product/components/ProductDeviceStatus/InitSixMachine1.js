import Equipment from './Equipment'
let sixMachine1Type = { 'retrieve': 'retrieve', 'retrieveDown': 'retrieveDown', 'retrieveUp': 'retrieveUp', 'load': 'load', 'loadUp': 'loadUp', 'loadDown': 'loadDown' };
let angles = { 'retrieve': 1.5, 'load': 4.7 };

let machine = null ,productAnimation=null;
class SixMachine1 extends Equipment{
    constructor(_productAnimation){
        machine = _productAnimation.getMachine('六轴机械臂1');
        super(machine);
        productAnimation=_productAnimation;
        this.addEvent();
    }
    addMateral(mess){
        machine.rotationY(mess)
        // console.log('mess',mess)
    }
    addEvent(){
        
        let rail1Metarial1 = productAnimation.getMetrail('轨道1物料1');
        let rail2Metarial1 = productAnimation.getMetrail('轨道2物料1');
        let sixMachine1Metrail=productAnimation.getMetrail('六轴1上物料')
        sixMachine1Metrail.disable();
        rail1Metarial1.setRailNum(1);
        rail2Metarial1.setRailNum(2);
        // let i = 0;
        machine.addEventListener(machine.event.rotationY, (event) => {
            let message = event.message;
            // console.log('message',message)
            //六轴1下料时候
            if (message.action === sixMachine1Type.load){
                // i=message.start
                machine.rotationZ({ angle: 0.3, action: sixMachine1Type.loadDown, railNum:message.tester.target  });
                // machine.rotationZ({ angle: 0.3, action: sixMachine1Type.loadDown, railNum: i });
            }
                //到取料位置作一个取料动作
                if (message.action === sixMachine1Type.retrieve){
                    machine.rotationZ({ angle: 0.5, action: sixMachine1Type.retrieveDown ,tester:message});
                }
        });

        machine.addEventListener(machine.event.rotationZ, (event) => {
            let message = event.message;
            if (!message.action) {
                return;
            }
            if (message.action === sixMachine1Type.retrieveDown) {//到取料点，作一个取料动作
                setTimeout(() => {
                    machine.rotationZ({ angle: 0.02, action: sixMachine1Type.retrieveUp ,tester:message.tester});//取料后复位
                }, 200);
            } else if (message.action === sixMachine1Type.retrieveUp) {//取料复位后，移到上料口(第一个4轴机器上那)
                setTimeout(() => {
                    machine.rotationY({ angle: angles.load, action: sixMachine1Type.load ,tester:message.tester});
                }, 200);
            } else if (message.action === sixMachine1Type.loadDown) {//取料复位后，移到上料口
                // i++;
                setTimeout(() => {
                    machine.rotationZ({ angle: 0.1, action: sixMachine1Type.loadUp });
                }, 200);
            }

            
        });


        machine.addEventListener(machine.event.rotationZ, (event) => {//监听上料机器人，sixMachine1Type.loadDown
          
            let message = event.message;
            // console.log('message',event.message)

            if (!message.action) {
                return;
            }
 
            if (sixMachine1Type.loadDown === message.action){//下料
                sixMachine1Metrail.disable();
            }else if(sixMachine1Type.loadUp === message.action){
                sixMachine1Metrail.disable();
                return;
            }else if(sixMachine1Type.retrieveUp === message.action){
                sixMachine1Metrail.block();
                return;
            }else if(sixMachine1Type.retrieveDown === message.action){
                sixMachine1Metrail.disable();
                return;
            }
            // console.log(message)
            if (message.railNum === 1) {
                
                // rail1Metarial1.add();//加一个
                if (!rail1Metarial1.isVisible()) {
                    // console.log('rail1Metarial1',rail1Metarial1.isVisible())
                    rail1Metarial1.block();
                }
            } else {
                // rail2Metarial1.add();
                if (!rail2Metarial1.isVisible()) {
                    // console.log('rail2Metarial1',rail2Metarial1.isVisible())
                    rail2Metarial1.block();
                }
            }
        });
    }
 


}


export default SixMachine1