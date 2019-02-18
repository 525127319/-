//测试摄象头
import Equipment from './Equipment';
let testers = [//默认往逆时针
    {'name': 'M1', 'angle': 2.7, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},//默认左上角第一个箱子
    {'name': 'M2', 'angle': 2.1, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M3', 'angle': 0.9, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M4', 'angle': 0.4, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M5', 'angle': 6.1, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M6', 'angle': 3.5, 'count': 0, 'event': 'tester',/**开始测试*/ 'testedEvent':'testedEvent'/**测试完成*/}

];

let rails = [
    { 'name': 'loadRail2', angle: 1.4,'event': 'machine2Retrieve' },//发布四轴机器人1抓取事件
    { 'name': 'loadRail1', angle: 1.6 ,'event': 'machine2Retrieve'},//发布四轴机器人1抓取事件
    { 'name': 'downRail2', angle: 5, index: 2, 'event': 'downEvent', /**下料事件*/ },
    { 'name': 'downRail1', angle: 4.6, index: 1, 'event': 'downEvent'/**下料事件*/ },
];
let map = new Map();
testers.forEach(tester=>{
    map.set(tester.name, tester); 
});

rails.forEach(rail => {
    map.set(rail.name, rail);
});

let machine = null, productAnimation = null, index = 0;
class MMIEquipment extends Equipment {
    constructor(_productAnimation) {
        machine = _productAnimation.getMachine('四轴机械臂3');
        super(machine);
        productAnimation = _productAnimation;
        this.addEvent();
    }

    //移到测试箱
    moveToTester(target){
        // let t = testers[index++];
        let t=map.get(target)
        super.rotationY({angle: t.angle, action: t.event, name: t.name});
        // if (index >= testers.length) index = 0;
    }

    downMteral(test){
        let _t=map.get(test.start)
            machine.rotationY({angle: _t.angle,action: _t.testedEvent,target:test.target});
            //机器人取到料后， 移到轨道并发布下料事件
 
    }

    toLoadRail1(metatrial,test) { 
        
       if(/m+/i.test(test.target)){ //上料
        let _t = map.get('loadRail1');
        super.toLoadRail1(metatrial, _t, ()=>{
            this.moveToTester(test.target);
        });
    }else{//下料
        this.downMteral(test)
    }
    }

    toLoadRail2(metatrial,test) {
        // let _t = map.get('loadRail2');
        // super.toLoadRail2(metatrial, _t, ()=>{
        //     this.moveToTester();
        // });
        if(/m+/i.test(test.target)){ //上料
            let _t = map.get('loadRail2');
            super.toLoadRail1(metatrial, _t, ()=>{
                this.moveToTester(test.target);
            });
        }else{//下料
            this.downMteral(test)
        }
    }

    addEvent() {
        let _metarial29 = productAnimation.getMetrail('轨道2物料9');
        let _metarial19 = productAnimation.getMetrail('轨道1物料9');
        let _metarial210 = productAnimation.getMetrail('轨道2物料10');
        let _metarial110 = productAnimation.getMetrail('轨道1物料10');
        let _defectiveMetarial6 = productAnimation.getMetrail('灰色物料6');
        let _defectiveMetarial7 = productAnimation.getMetrail('灰色物料7');
        let _defectiveMetarial8 = productAnimation.getMetrail('灰色物料8');
        let _machine1Metrail=productAnimation.getMetrail('四轴3上物料');
            _machine1Metrail.disable();
            _defectiveMetarial6.disable();
            _defectiveMetarial7.disable();
            _defectiveMetarial8.disable();

        machine.addEventListener(machine.event.rotationY, event => {
            let message = event.message;
            let action = message.action;
            // let name = message.name;
            // let _t = map.get(name);
           
            if ('tester' === action) {//监听物料到达下一个出口
                _machine1Metrail.disable();
                // setTimeout(()=>{
                //     machine.rotationY({angle: _t.angle});//去到tester取料，
                   
                //     let _index = index % 2 === 0 ? 2 : 3;
                //     let _rail = rails[_index];
                //     machine.rotationY({angle: _rail.angle, action: _rail.event, railIndex: _index});

                // }, 500);
               
            }else if('machine2Retrieve'===action){
                _machine1Metrail.block();
            } else if(action==='testedEvent'){
                let test=event.message;
                let _rail =test.target===2? rails[2]:rails[3];
                setTimeout(()=>{  machine.rotationY({angle: _rail.angle, action: _rail.event, railIndex: test.target});},10)
           
            }else if ('downEvent' === action){//下料事件
                _machine1Metrail.disable();
                // let railIndex = message.railIndex;
                // let _rail = rails[railIndex];
                let _rail = message.railIndex;
                if (_rail === 2) {
                    _metarial29.add();
                    _metarial29.move(_metarial29.distance.metarial29To10);//滑到下一个上料口
                } else if(_rail === 3){
                    
                        _defectiveMetarial7.add();
                        _defectiveMetarial7.move(_defectiveMetarial7.distance.defectiveMetaria7ToEnd);
                    } else if(_rail === 1){
                        _metarial19.add();
                        _metarial19.move(_metarial19.distance.metarial19To10);//滑到下一个上料口
                    }

                 
              
            }
        });

          // //监听第4块物料到达位置，如果到了，第5个物料+1，第4块物料重置，并不显视
          _metarial29.addEventListener(_metarial29.event.arriveTarget, event => {
                _metarial210.block();
                _metarial29.disable();
                _metarial29.reset();
            });

            _metarial19.addEventListener(_metarial19.event.arriveTarget, event => {
                _metarial110.block();
                _metarial19.disable();
                _metarial19.reset();
            });
            _defectiveMetarial7.addEventListener(_defectiveMetarial7.event.arriveTarget, event => {
                _defectiveMetarial8.block();
                _defectiveMetarial7.disable();
                _defectiveMetarial7.reset();
            });
    }
}

export default MMIEquipment;