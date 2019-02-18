//测试摄象头
import Equipment from './Equipment';
let rails = [
    { 'name': 'loadRail2', angle: 1.4 },//发布四轴机器人1抓取事件
    { 'name': 'loadRail1', angle: 1.6 },//发布四轴机器人1抓取事件
    { 'name': 'downRail2', angle: 4.6, index: 2, 'event': 'toNextStation', /**下料事件*/ },
    { 'name': 'downRail1', angle: 5, index: 1, 'event': 'toNextStation'/**下料事件*/ },
];
let map = new Map();
rails.forEach(rail => {
    map.set(rail.name, rail);
});

let machine = null, productAnimation = null, index = 0;
class CameraEquipment extends Equipment {
    constructor(_productAnimation) {
        machine = _productAnimation.getMachine('六轴机械臂2');
        super(machine);
        productAnimation = _productAnimation;
        this.addEvent();
    }

    //让6轴机器人转到下料口
    toNextStation(test) {
        let tar
        if (test.target === 1) {
            tar = 2;
        }else{
            tar=3
        }
        let t = rails[tar];
        super.rotationY({ angle: t.angle, action: t.event, name: t.name ,test});//发布事件，让下
        // if (index === 2) {//切换轨道
        //     index = 3;
        // } else {
        //     index = 2;
        // }
    }

    toLoadRail1(metatrial,test) {
        let _t = map.get('loadRail1');
        this.getMetarial(_t, metatrial,test);
    }

    toLoadRail2(metatrial,test) {
        let _t = map.get('loadRail2');
        this.getMetarial(_t, metatrial,test);
    }

    getMetarial(_t, metatrial,test) {
        this.rotationY({ angle: _t.angle, action: _t.event });
        this.rotationZ({ angle: 0.3 }, 1);
        const _this = this;
        setTimeout(() => {//做一个取料动作
            _this.rotationZ({ angle: 0.1 }, -1);
            metatrial.reduce();
            this.toNextStation(test);
        }, 500);
    }

    addEvent() {
            let _metarial26 = productAnimation.getMetrail('轨道2物料6');
            let _metarial16 = productAnimation.getMetrail('轨道1物料6');
            let _metarial28 = productAnimation.getMetrail('轨道2物料8');
            let _metarial18 = productAnimation.getMetrail('轨道1物料8');
            let _defectiveMetarial4 = productAnimation.getMetrail('灰色物料4');
            let _defectiveMetarial5 = productAnimation.getMetrail('灰色物料5');
            let _defectiveMetarial8 = productAnimation.getMetrail('灰色物料8');
            let _machine1Metrail=productAnimation.getMetrail('六轴2上物料');
                _machine1Metrail.disable();
                _defectiveMetarial4.disable();
                _defectiveMetarial5.disable();
                _defectiveMetarial8.disable();

        machine.addEventListener(machine.event.rotationY, event => {
            let message = event.message;
            let action = message.action;
            _machine1Metrail.block();

            if ('toNextStation' === action) {//监听物料到达下一个出口
                _machine1Metrail.disable();
                if (message.test.target === 2) {
                    _metarial26.add();
                    _metarial26.move(_metarial26.distance.metarial26To8);//滑到下一个上料口
                } else if(message.test.target === 3){
                        _defectiveMetarial5.add();
                        _defectiveMetarial5.move(_defectiveMetarial5.distance.defectiveMetaria5ToEnd);
                    } else if(message.test.target === 1){
                        _metarial16.add();
                        _metarial16.move(_metarial16.distance.metarial16To8);//滑到下一个上料口
                }
                // let _index = index % 2 === 0 ? 2 : 3;
                // let _rail = rails[_index];
                // if (_rail.index === 2) {
                //     _metarial26.add();
                //     _metarial26.move(_metarial26.distance.metarial26To8);//滑到下一个上料口
                // } else {
                //     let randomNum = Math.round(Math.random()*10);
                //     if(randomNum<3) {
                //         _defectiveMetarial5.add();
                //         _defectiveMetarial5.move(_defectiveMetarial5.distance.defectiveMetaria5ToEnd);
                //     } else {
                //         _metarial16.add();
                //         _metarial16.move(_metarial16.distance.metarial16To8);//滑到下一个上料口
                //     }
                    
                // }
            }
        });


            //监听第6块物料到达位置，如果到了，第8个物料+1，第6块物料重置，并不显视
            _metarial26.addEventListener(_metarial26.event.arriveTarget, event => {
                _metarial28.block();
                _metarial26.disable();
                _metarial26.reset();
            });

            _metarial16.addEventListener(_metarial16.event.arriveTarget, event => {
                _metarial18.block();
                _metarial16.disable();
                _metarial16.reset();
            });
            _defectiveMetarial5.addEventListener(_defectiveMetarial5.event.arriveTarget, event => {
                _defectiveMetarial8.block();
                _defectiveMetarial5.disable();
                _defectiveMetarial5.reset();
            });
    }
}

export default CameraEquipment;