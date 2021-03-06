//测试摄象头
import Equipment from './Equipment';
let testers = [//默认往逆时针
    {'name': 'M1', 'angle': 6.1, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},//默认左上角第一个箱子
    {'name': 'M2', 'angle': 5.6, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M3', 'angle': 4.4, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M4', 'angle': 3.8, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M5', 'angle': 3.2, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M6', 'angle': 2.5, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M7', 'angle': 1.2, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},
    {'name': 'M8', 'angle': 0.6, 'count': 0, 'event': 'tester', 'testedEvent':'testedEvent'},

];

let rails = [
    { 'name': 'loadRail2', angle: 4.8 },//发布四轴机器人2抓取事件
    { 'name': 'loadRail1', angle: 5.2 },//发布四轴机器人2抓取事件
    { 'name': 'downRail1', angle: 1.7, index: 1, 'event': 'downEvent'/**下料事件*/ },
    { 'name': 'downRail2', angle: 2.0, index: 2, 'event': 'downEvent', /**下料事件*/ },
    { 'name': 'downRail3', angle: 1.8, index: 3, 'event': 'downEvent'/**下料事件*/ },
];
let map = new Map();
testers.forEach(tester=>{
    map.set(tester.name, tester);
});

rails.forEach(rail => {
    map.set(rail.name, rail);
});

let machine = null, smtAnimation = null, index = 0;
class Machine2 extends Equipment {
    constructor(_smtAnimation) {
        machine = _smtAnimation.getMachine('四轴机器人2');
        super(machine);
        smtAnimation = _smtAnimation;
        this.addEvent();
    }

    //移到测试箱
    moveToTester(tester_name){
        let t = map.get(tester_name.target);
        super.rotationY({angle: t.angle, action: t.event, name: t.name});
        if (index >= testers.length) index = 0;
       
        
    }

    toLoadRail1(metatrial,tester_name) {
        //machine.rotationY({angle: 4.6});
        let _t = map.get('loadRail1');
        super.toLoadRail1(metatrial, _t, tester_name, (tester_name)=>{
            this.moveToTester(tester_name);
            metatrial.reduce();
        });
       
    }

    toLoadRail2(metatrial,tester_name) {
        let _t = map.get('loadRail2');
        super.toLoadRail2(metatrial, _t, tester_name, (tester_name)=>{
            this.moveToTester(tester_name);
            metatrial.reduce();
          
        });
       
    }

    moToRail(message) {// 去到tester取料,放到对应的轨道上
      
        let name = message;

        // let _index = null;
        let _t = map.get(name.start);
        // if(message.result === 4) {
        //     _index = 3
        // } else if(message.result === 5) {
        //     _index = 2
        // } else if(message.result === 6) {
        //     _index = 4
        // }
        machine.rotationY({angle: _t.angle});//去到tester取料，

        setTimeout(() => {// 等取料动作完成，再移动到下料轨道
            // let _rail = rails[_index];
            let _rail = rails[(name.target)*1+1];
            machine.rotationY({angle: _rail.angle, action: _rail.event,message});
        },500);
    }

    addEvent() {
        let _metarial24 = smtAnimation.getMetrail('轨道2物料4');
        let _metarial14 = smtAnimation.getMetrail('轨道1物料4');
        let _metarial25 = smtAnimation.getMetrail('轨道2物料5');
        let _metarial15 = smtAnimation.getMetrail('轨道1物料5');
        let _defectiveMetarial2 = smtAnimation.getMetrail('灰色物料2');
        let _defectiveMetarial3 = smtAnimation.getMetrail('灰色物料3');
        let _machineMetarial2 = smtAnimation.getMetrail('四轴2上物料');
        _machineMetarial2.disable();

        machine.addEventListener(machine.event.rotationY, event => {
            let message = event.message;
            let action = message.action;
            // let name = message.name;
            // let _t = map.get(name);
            _machineMetarial2.block();

            if ('tester' === action) {//监听物料到达下一个出口
                _machineMetarial2.disable();
                // setTimeout(()=>{
                //     machine.rotationY({angle: _t.angle});//去到tester取料，
                //     let _index = index % 2 === 0 ? 2 : 3;
                //     let _rail = rails[_index];
                //     machine.rotationY({angle: _rail.angle, action: _rail.event, railIndex: _index});
                //
                // }, 500);

            } else if ('downEvent' === action){//下料事件
                let mess=event.message;
                _machineMetarial2.disable();
                // let railIndex = message.railIndex;
                // let _rail = rails[railIndex];
                // let randomNum = Math.round(Math.random());
                if (mess.message.target === 2) {
                    _metarial24.block();
                    _metarial24.move(_metarial24.distance.smtmetarial4To5,4.5);//滑到下一个上料口
                } else if(mess.message.target === 1) {
                    // if(randomNum) {
                    _metarial14.block();
                    _metarial14.move(_metarial14.distance.smtmetarial4To5,4.5);//滑到下一个上料口
                } else {
                    _defectiveMetarial2.block();
                    _defectiveMetarial2.move(_defectiveMetarial2.distance.smtdefectivemetarial2To3,4.5);//滑到下一个上料口
                }
                // }
            }
        });

        // //监听第4块物料到达位置，如果到了，第5个物料+1，第4块物料重置，并不显视
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

        _defectiveMetarial2.addEventListener(_defectiveMetarial2.event.arriveTarget, event => {
            _defectiveMetarial3.block();
            _defectiveMetarial2.disable();
            _defectiveMetarial2.reset();
        });
    }
}

export default Machine2;