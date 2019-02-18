import AnimationUtil from '@/utils/AnimationUtil';
import productAnimation from './ProductAnimation';
import Equipment from './Equipment';
//metatrial:  表示有多少物料
let testers = [//默认往逆时针
    {'name': 'M1', 'angle': 2.8, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},//默认左上角
    {'name': 'M2', 'angle': 0.3, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M3', 'angle': 5.9, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M4', 'angle': 5.4, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M5', 'angle': 4.2, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M6', 'angle': 3.5, 'direction':  AnimationUtil.negative, 'count': 0, 'event': 'tester'/**测试事件*/, 'testedEvent':'testedEvent'/**测试完成事件*/},
];

let rails = [
    {'name': 'loadRail2', angle: 1.4, 'direction':  AnimationUtil.negative, 'event': 'machine1Retrieve'/**抓料事件*/},//发布四轴机器人1抓取事件
    {'name': 'loadRail1', angle: 1.6, 'direction':  AnimationUtil.negative, 'event': 'machine1Retrieve'/**抓料事件*/},//发布四轴机器人1抓取事件
    {'name': 'downRail2', angle: 4.6, 'downEvent':'downEvent', /**下料事件*/'direction':  AnimationUtil.negative},
    {'name': 'downRail1', angle: 5, 'downEvent':'downEvent'/**下料事件*/, 'direction':  AnimationUtil.negative},
];

// let testingName = [];

let map = new Map();
// let testerIndex = 0;
testers.forEach(tester=>{
    map.set(tester.name, tester); 
});

rails.forEach(rail=>{
    map.set(rail.name, rail); 
});

//let mock = function(){
    // let i = 0;
    // setInterval(()=>{ //数据驱动时获取不到测试的结果    
    //     if (testingName.length <= 0)return;
    //     let item = testingName.shift();
    //     let _t = map.get(item);
    //     machine.rotationY({angle: _t.angle, action: _t.testedEvent, testerName: _t.name, index: i++});
    //     _t.count--;
    // }, 500);
//}

let machine = null, productAnimatio = null;
class ShieldEquipment extends Equipment{
    constructor(_productAnimation){
        machine = _productAnimation.getMachine('四轴机械臂1')
        super(machine);
        productAnimatio = _productAnimation;
        this.addEvent();
    }
    
    toLoadRail1(metatrial,test_name){ //轨道2物料1
      
        if(/m+/i.test(test_name.start)){
            let _t = map.get(test_name.start);
            this.rotationY({angle: _t.angle, action: _t.testedEvent, testerName: _t.name, index:test_name.target});
        }else{
            let _t = map.get('loadRail1');
            this.rotationY({angle: _t.angle, action: _t.event,test_name});
            this.positionY({position: 10}, -1);
            const _this = this;
             setTimeout(() => {//做一个取料动作
                 _this.positionY({position: 30}, 1);
                //  metatrial.disable()
                 metatrial.reduce();
             }, 300);
        }
       
    }

    toLoadRail2(metatrial,test_name){

        if(/m+/i.test(test_name.start)){
            let _t = map.get(test_name.start);
            this.rotationY({angle: _t.angle, action: _t.testedEvent, testerName: _t.name, index:test_name.target});
        }else{
            let _t = map.get('loadRail2');
            this.rotationY({angle: _t.angle, action: _t.event,test_name});
            this.positionY({position: 10}, -1);
            const _this = this;
             setTimeout(() => {//做一个取料动作
                 _this.positionY({position: 30}, 1);
                 metatrial.reduce();
             }, 300);
        }

        // let _t = map.get('loadRail2');
        // this.rotationY({angle: _t.angle, action: _t.event});
        // this.positionY({position: 10}, -1);
        // const _this = this;
        //  setTimeout(() => {//做一个取料动作
        //      _this.positionY({position: 30}, 1);
        //      metatrial.reduce();
        //  }, 300);
    }

    addEvent(){

        let _defectiveMetarial1 = productAnimatio.getMetrail('灰色物料1');
        let _defectiveMetarial8 = productAnimatio.getMetrail('灰色物料8');
        let _machine1Metrail = productAnimatio.getMetrail('四轴1上物料');
        // let rail1Metarial1 = productAnimatio.getMetrail('轨道1物料1');
        // let rail2Metarial1 = productAnimatio.getMetrail('轨道2物料1');
        let rail1Metarial2 = productAnimatio.getMetrail('轨道1物料2');
        let rail2Metarial2 = productAnimatio.getMetrail('轨道2物料2');
        let rail1Metarial3 = productAnimatio.getMetrail('轨道1物料3');
        let rail2Metarial3 = productAnimatio.getMetrail('轨道2物料3');
            _machine1Metrail.disable();
            _defectiveMetarial1.disable();
            _defectiveMetarial8.disable();
        machine.addEventListener(machine.event.rotationY, event=>{
            let message = event.message;
            if ('machine1Retrieve' === message.action){
                _machine1Metrail.block();
                // if(message.test_name.start===1){
                //     rail1Metarial1.disable();
                // }else if(message.test_name.start===2){
                //     rail2Metarial1.disable();
                // }
               
                // let _t = testers[testerIndex];
                let _t=map.get(event.message.test_name.target)
                setTimeout(()=>{
                    machine.rotationY({angle: _t.angle, action: _t.event, testerName: _t.name});
                    _t.count++; //未读取到改取料  会一直存在
                }, 500);
                // testerIndex++;
                // if (testerIndex >= testers.length)
                //     testerIndex = 0;
            } else if ('tester' === message.action){//监听测试事件
                _machine1Metrail.disable();
                // testingName.push(message.testerName);
            } else if ('testedEvent' === message.action){//监听测试完成，并移到下料带上
                _machine1Metrail.block();
                let index = message.index;
                let _tt = null;
                if (index % 2 !==0){
                    _tt = map.get('downRail2');
                } else {
                    _tt = map.get('downRail1');
                }
                setTimeout(()=>{machine.rotationY({angle: _tt.angle, action: _tt.downEvent, testerName: _tt.name, index: index});},50)
                
            } else if ('downEvent' === message.action){//上下一个机器人的料
                _machine1Metrail.disable();
                let _index = message.index;
                if(_index ===3){
                    _defectiveMetarial1.add();
                    _defectiveMetarial1.move(_defectiveMetarial1.distance.defectiveMetaria1ToEnd,20);
                }else{
                    let _ttt = productAnimation.getMetrail('轨道'+_index+'物料2');
                    _ttt.add();
                    if(_ttt.name==='轨道1物料2'){
                        _ttt.move(_ttt.distance.Rail2metarial2To3);
                     
                    }else{
                        _ttt.move(_ttt.distance.Rail1metarial2To3);
                        
                    }
                }
                // let _ttt = productAnimation.getMetrail('轨道'+(_index % 2 + 1)+'物料2');
                // let randomNum = Math.round(Math.random()*10);
                // if(randomNum<3) {  //灰色物料下料
                //     _defectiveMetarial1.add();
                //     _defectiveMetarial1.move(_defectiveMetarial1.distance.defectiveMetaria1ToEnd);
                // } else {
                //     _ttt.add();
                //     if(_ttt.name==='轨道1物料2'){
                //         _ttt.move(_ttt.distance.Rail2metarial2To3);
                //     }else{
                //         _ttt.move(_ttt.distance.Rail1metarial2To3);
                //     }
                                                            
                    //machine.rotationY({angle: _t.angle, action: _t.downEvent, testerName: _t.name});
                // }
                // _ttt.add();
                // _ttt.move(_ttt.distance.metarial2To3);
            }

        });
        rail1Metarial2.addEventListener(rail1Metarial2.event.arriveTarget, event => {
            rail1Metarial3.block()
            rail1Metarial2.disable()
            rail1Metarial2.reset()
        });
        rail2Metarial2.addEventListener(rail2Metarial2.event.arriveTarget, event => {
    
            rail2Metarial3.block();
            rail2Metarial2.disable()
            rail2Metarial2.reset()
        });


        _defectiveMetarial1.addEventListener(_defectiveMetarial1.event.arriveTarget, event => {
            _defectiveMetarial8.block();
            _defectiveMetarial1.disable();
            _defectiveMetarial1.reset();
        });
    }
}

export default ShieldEquipment;