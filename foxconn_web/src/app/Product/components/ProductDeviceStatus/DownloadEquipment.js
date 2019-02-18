//下料机器人
import Equipment from './Equipment';
let rails = [
    { 'name': 'loadRail2', angle: 1.4 },//发布四轴机器人1抓取事件
    { 'name': 'loadRail1', angle: 1.6 },//发布四轴机器人1抓取事件
    { 'name': 'downRail1', angle: 2.8, index: 1, 'event': 'toNextStation'/**下料事件*/ },
    { 'name': 'downRail2', angle: 3.2, index: 2, 'event': 'toNextStation', /**下料事件*/ }
];
let map = new Map();
rails.forEach(rail => {
    map.set(rail.name, rail);
});

let machine = null, productAnimation = null, index = 0;
class DownloadEquipment extends Equipment {
    constructor(_productAnimation) {
        machine = _productAnimation.getMachine('四轴机械臂4');
        super(machine);
        productAnimation = _productAnimation;
        this.addEvent();
    }

    //让6轴机器人转到下料口
    toNextStation(test) {
        // if (index === 0) {
        //     index = 2;
        // }
        let t
        if(test.start===3){
            t= rails[3];
        }else{
            t= rails[2];
        }
       
        super.rotationY({ angle: t.angle, action: t.event, name: t.name,test });//发布事件，让下
        // if (index === 2) {//切换轨道
        //     index = 3;
        // } else {
        //     index = 2;
        // }
    }

    toLoadRail1(metatrial,test) {
       // this.rotationY({angle: 2.8});
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
        let _finishedGreenMetarial = productAnimation.getMetrail('完成绿色物料');
        let _finishedGrayMetarial = productAnimation.getMetrail('完成灰色物料');
        let _metarial210 = productAnimation.getMetrail('轨道2物料10');
        let _metarial110 = productAnimation.getMetrail('轨道1物料10');
        let _machine1Metrail=productAnimation.getMetrail('四轴4上物料');
             _machine1Metrail.disable();
        machine.addEventListener(machine.event.rotationY, event => {
            let message = event.message;
            let action = message.action;
            _machine1Metrail.block();
            if ('toNextStation' === action) {//监听物料到达下一个出口
                let _rail=message.test.target
                // let _index = index % 2 === 0 ? 2 : 3;
                // let _rail = rails[_index];
                if (_rail === 1) {
                    _finishedGreenMetarial.add();
                    _machine1Metrail.disable();
                   // _metarial26.move(_metarial26.distance.metarial6To8);//滑到下一个上料口
                } else {
                    _finishedGrayMetarial.add();
                    _machine1Metrail.disable();
                    //_finishedGrayMetarial.move(_metarial16.distance.metarial6To8);//滑到下一个上料口
                }
            }
        });


            //监听第6块物料到达位置，如果到了，第8个物料+1，第6块物料重置，并不显视
            _metarial210.addEventListener(_metarial210.event.arriveTarget, event => {
                _finishedGreenMetarial.add();
                _metarial210.disable();
                _metarial210.reset();
            });

            _metarial110.addEventListener(_metarial110.event.arriveTarget, event => {
                _finishedGrayMetarial.add();
                _metarial110.disable();
                _metarial110.reset();
            });
    }
}

export default DownloadEquipment;