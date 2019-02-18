//声音设备
import Equipment from './Equipment';

let testers = [//默认往逆时针
    {'name': 'M1', 'angle': 6, 'count': 0, 'event': 'tester',/**开始测试*/ 'testedEvent':'testedEvent'/**测试完成*/},//默认右下第一个角
    {'name': 'M2', 'angle': 5.5, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M3', 'angle': 4.2, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M4', 'angle': 3.5, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'}
];

let rails = [
    {'name': 'loadRail2', angle: 1.3,  'event': 'machine2Retrieve'/**抓料事件*/},//发布四轴机器人1抓取事件
    {'name': 'loadRail1', angle: 1.6,  'event': 'machine2Retrieve'/**抓料事件*/},//发布四轴机器人1抓取事件
    {'name': 'downRail2', angle: 5, index: 2, 'event':'downEvent', /**下料事件*/},
    {'name': 'downRail1', angle: 4.7, index: 1, 'event':'downEvent'/**下料事件*/},
];

let map = new Map();
testers.forEach(tester=>{
    map.set(tester.name, tester); 
});

rails.forEach(rail=>{
    map.set(rail.name, rail); 
});

let machine = null, productAnimation = null, index = 0;
class VoiceEquipment extends Equipment{
    constructor(_productAnimation){
        machine = _productAnimation.getMachine('四轴机械臂2');
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
    toLoadRail1(metatrial,test){
        if(/m+/i.test(test.target)){ //上料
            let _t = map.get('loadRail1');
            super.toLoadRail1(metatrial, _t, ()=>{
                this.moveToTester(test.target);
            });
        }else{//下料
            this.downMteral(test)
        }
       
    }

    toLoadRail2(metatrial,test){
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

    addEvent(){
        let _metarial14 = productAnimation.getMetrail('轨道1物料4');
        let _metarial24 = productAnimation.getMetrail('轨道2物料4');
        let _metarial15 = productAnimation.getMetrail('轨道1物料5');
        let _metarial25 = productAnimation.getMetrail('轨道2物料5');
        let _defectiveMetarial2 = productAnimation.getMetrail('灰色物料2');
        let _defectiveMetarial3 = productAnimation.getMetrail('灰色物料3');
        let _defectiveMetarial8 = productAnimation.getMetrail('灰色物料8');
        let _machine1Metrail=productAnimation.getMetrail('四轴2上物料');
            _machine1Metrail.disable();
            _defectiveMetarial2.disable();
            _defectiveMetarial3.disable();
            _defectiveMetarial8.disable();
        machine.addEventListener(machine.event.rotationY, event=>{
            let message = event.message;
            let action = message.action;
            // let name = message.name;
            // let _t = map.get(name);
            if ('tester' === action){//监听测试事件
                _machine1Metrail.disable();
                // setTimeout(()=>{
                //     //让机器人过来取物料当测试完成
                //     machine.rotationY({angle: _t.angle});
                //     //机器人取到料后， 移到轨道并发布下料事件
                //     let _index = index % 2 === 0 ? 2 : 3;
                //     let _rail = rails[_index];
                //     machine.rotationY({angle: _rail.angle, action: _rail.event, railIndex: _index});

                //    // _t.count++;
                // }, 500);//等一会，，
            }else if('machine2Retrieve'===action){
                _machine1Metrail.block();
            }else if(action==='testedEvent'){
                let test=event.message;
                let _rail =test.target===2? rails[2]:rails[3];
                setTimeout(()=>{  machine.rotationY({angle: _rail.angle, action: _rail.event, railIndex: test.target});},10)
              
            }  else if ('downEvent' === action){//下料事件
                _machine1Metrail.disable();
                let _rail = message.railIndex;
                // let _rail = rails[railIndex];
               
                if (_rail === 2){
                    _metarial24.add();
                    _metarial24.move(_metarial24.distance.metarial24To5);
                    
                } else if(_rail=== 1){
                    _metarial14.add();
                    _metarial14.move(_metarial24.distance.metarial14To5);
                }else{
                    _defectiveMetarial3.add();
                    _defectiveMetarial3.move(_defectiveMetarial3.distance.defectiveMetaria3ToEnd);
                }
                // {
                //     let randomNum = Math.round(Math.random()*10);
                //     if(randomNum<3) {
                //         _defectiveMetarial3.add();
                //         _defectiveMetarial3.move(_defectiveMetarial3.distance.defectiveMetaria3ToEnd);
                //     } else {
                //         _metarial14.add();
                //         _metarial14.move(_metarial24.distance.metarial14To5);
                //     }
                // }
            }
        });

        //监听第4块物料到达位置，如果到了，第5个物料+1，第4块物料重置，并不显视
        _metarial24.addEventListener(_metarial24.event.arriveTarget, event => {
            _metarial25.block();
            _metarial24.disable();
            _metarial24.reset();
        });

        _metarial14.addEventListener(_metarial14.event.arriveTarget, event => {
            _metarial15.block();
            _metarial14.disable();
            _metarial14.reset();
        });

        _defectiveMetarial3.addEventListener(_defectiveMetarial3.event.arriveTarget, event => {
            _defectiveMetarial8.block();
            _defectiveMetarial3.disable();
            _defectiveMetarial3.reset();
        });
    }
}

export default VoiceEquipment;