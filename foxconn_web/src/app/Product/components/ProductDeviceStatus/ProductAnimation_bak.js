import AnimationUtil from '@/utils/AnimationUtil';
import RailMetarial from '@/utils/RailMetarial';
import Machine from '@/utils/Machine';
import ShieldEquipment from './ShieldEquipment';
import VoiceEquipment from './VoiceEquipment';
import CameraEquipment from './CameraEquipment';
import MMIEquipment from './MMIEquipment';
import DownloadEquipment from './DownloadEquipment';

let animationUtil = new AnimationUtil();
let sixMachine1Type = { 'retrieve': 'retrieve', 'retrieveDown': 'retrieveDown', 'retrieveUp': 'retrieveUp', 'load': 'load', 'loadUp': 'loadUp', 'loadDown': 'loadDown' };
let metarialMap = new Map();
let machineMap = new Map();
let sixMachine1 = null;
let angles = { 'retrieve': 1.5, 'load': 4.7 };
let interval_output = null, isStop = false;;
class ProductAnimation {

    //初始化第一个6个机器人
    initSixMachine1() {
        //六轴机械臂1
        sixMachine1 = this.getMachine('六轴机械臂1');
        sixMachine1.rotationY({ angle: 0 });//初始化位置

        let i = 0;
        //监听取料，下料的位置
        sixMachine1.addEventListener(sixMachine1.event.rotationY, (event) => {
            let message = event.message;
            //下料时候
            if (message.action === sixMachine1Type.load)
                sixMachine1.rotationZ({ angle: 0.3, action: sixMachine1Type.loadDown, railNum: i % 2 == 0 ? 2 : 1 });

            //到取料位置作一个取料动作
            if (message.action === sixMachine1Type.retrieve)
                sixMachine1.rotationZ({ angle: 0.5, action: sixMachine1Type.retrieveDown });
        });
        //监听取料，下料
        sixMachine1.addEventListener(sixMachine1.event.rotationZ, (event) => {
            let message = event.message;
            if (!message.action) {
                return;
            }
            if (message.action === sixMachine1Type.retrieveDown) {//到取料点，作一个取料动作
                setTimeout(() => {
                    sixMachine1.rotationZ({ angle: 0.02, action: sixMachine1Type.retrieveUp });//取料后复位
                }, 500);
            } else if (message.action === sixMachine1Type.retrieveUp) {//取料复位后，移到上料口(第一个4轴机器上那)
                setTimeout(() => {
                    sixMachine1.rotationY({ angle: angles.load, action: sixMachine1Type.load });
                }, 500);
            } else if (message.action === sixMachine1Type.loadDown) {//取料复位后，移到上料口
                i++;
                setTimeout(() => {
                    sixMachine1.rotationZ({ angle: 0.1, action: sixMachine1Type.loadUp });
                }, 500);
            }
        });

        // setTimeout(() => {
        //    sixMachine1.rotationY({angle: angles.retrieve, action: sixMachine1Type.retrieve});
        // }, 8000);

        //}, 3000);

    }

    start() {
        //setInterval(() => {   
        isStop = false;
        
        let fn = () => {
            console.log('......setInterval.......');
            sixMachine1.rotationY({ angle: angles.retrieve, action: sixMachine1Type.retrieve });
        }

        interval_output = setInterval(fn, 5000);

        function handleVisibilityChange() {
            if (document.hidden) {
                clearInterval(interval_output);
            } else {
                interval_output = setInterval(fn, 5000);
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange, false);
        this.animate();
        // // window 失去焦点，停止输出
        // window.onblur = function () {
        //     clearInterval(interval_output);
        // };

        // // window 每次获得焦点
        // window.onfocus = function () {
        //     // 每 1 秒在页面输出一个数
        //     if(isStop)return;
        //     clearInterval(interval_output);
        //     interval_output = setInterval(fn, 5000);
        // }
    }

    stop() {
        isStop = true;
        clearInterval(interval_output);
        //machineMap.clear();
        //metarialMap.clear();
       // animationUtil.clear();
       // this.model = null;
    }


    //初始化第一个4个机器人
    initShieldEquipment() {
        let rail1Metarial1 = metarialMap.get('轨道1物料1');
        let rail2Metarial1 = metarialMap.get('轨道2物料1');
        let shieldEquipment = new ShieldEquipment(this);
        //fourMachine1.rotationY({angle: 4.7});



        rail1Metarial1.addEventListener(rail1Metarial1.event.add, event => {//当物料2-1有物料时候
            //有物料， 驱动机器人取料
            shieldEquipment.toLoadRail2(rail1Metarial1);
        });

        rail2Metarial1.addEventListener(rail2Metarial1.event.add, event => {//当物料1-1有物料时候
            shieldEquipment.toLoadRail1(rail2Metarial1);
        });
    }

    //初始化第一个物料
    initMetarial1() {
        let sixMachine1 = this.getMachine('六轴机械臂1');
        //监听上料机器人loadUp事件，有，即显视
        let rail1Metarial1 = metarialMap.get('轨道1物料1');
        let rail2Metarial1 = metarialMap.get('轨道2物料1');
        let sixMachine1Metrail = this.getMetrail('六轴1上物料')
        sixMachine1Metrail.disable();
        rail1Metarial1.setRailNum(1);
        rail2Metarial1.setRailNum(2);

        sixMachine1.addEventListener(sixMachine1.event.rotationZ, (event) => {//监听上料机器人，sixMachine1Type.loadDown

            let message = event.message;
            if (!message.action) {
                return;
            }
            // if (sixMachine1Type.loadDown !== message.action){//不是放下的事件，只作上料事件
            //     sixMachine1Metrail.block();
            //     return;
            // }
            if (sixMachine1Type.loadDown === message.action) {//下料
                sixMachine1Metrail.disable();
            } else if (sixMachine1Type.loadUp === message.action) {
                sixMachine1Metrail.disable();
                return;
            } else if (sixMachine1Type.retrieveUp === message.action) {
                sixMachine1Metrail.block();
                return;
            } else if (sixMachine1Type.retrieveDown === message.action) {
                sixMachine1Metrail.disable();
                return;
            }
            if (message.railNum === 2) {

                rail1Metarial1.add();//加一个
                if (!rail1Metarial1.isVisible()) {
                    rail1Metarial1.block();
                }
            } else {
                rail2Metarial1.add();
                if (!rail2Metarial1.isVisible()) {
                    rail2Metarial1.block();
                }
            }
        });
    }

    initMetarial2() {
        let rail1Metarial2 = metarialMap.get('轨道1物料2');
        let rail2Metarial2 = metarialMap.get('轨道2物料2');
        let rail1Metarial3 = metarialMap.get('轨道1物料3');
        let rail2Metarial3 = metarialMap.get('轨道2物料3');

        //监听物料到达第二个机器人的上料口，并上第三个物料显视出来
        rail1Metarial2.addEventListener(rail1Metarial2.event.arriveTarget, event => {
            rail1Metarial3.add();
            rail1Metarial2.disable();
            rail1Metarial2.reset();
        });
        rail2Metarial2.addEventListener(rail1Metarial2.event.arriveTarget, event => {
            rail2Metarial3.add();
            rail2Metarial2.disable();
            rail2Metarial2.reset();
        });
    }

    initVoiceEquipment() {
        let voiceEquipment = new VoiceEquipment(this);
        let rail1Metarial3 = metarialMap.get('轨道1物料3');
        let rail2Metarial3 = metarialMap.get('轨道2物料3');

        //voiceEquipment.rotationY({angle: 5});

        rail1Metarial3.addEventListener(rail1Metarial3.event.add, event => {
            //驱动四轴机器人2来取料
            voiceEquipment.toLoadRail1(rail1Metarial3);
        });

        rail2Metarial3.addEventListener(rail2Metarial3.event.add, event => {
            voiceEquipment.toLoadRail2(rail2Metarial3);
        });
    }

    initCameraEquipment() {
        let cameraEquipment = new CameraEquipment(this);
        let rail1Metarial5 = metarialMap.get('轨道1物料5');
        let rail2Metarial5 = metarialMap.get('轨道2物料5');



        //cameraEquipment.toLoadRail1(rail1Metarial4);

        rail1Metarial5.addEventListener(rail1Metarial5.event.add, event => {
            //驱动四轴机器人2来取料
            cameraEquipment.toLoadRail1(rail1Metarial5);
        });

        rail2Metarial5.addEventListener(rail2Metarial5.event.add, event => {
            cameraEquipment.toLoadRail2(rail2Metarial5);
        });
    }

    initMMIEquipment() {
        let mmiEquipment = new MMIEquipment(this);
        let rail1Metarial8 = metarialMap.get('轨道1物料8');
        let rail2Metarial8 = metarialMap.get('轨道2物料8');

        // mmiEquipment.toLoadRail1();
        //上一个工站，会触发添加事件
        rail1Metarial8.addEventListener(rail1Metarial8.event.add, event => {
            //驱动四轴机器人3来取料
            mmiEquipment.toLoadRail1(rail1Metarial8);
        });

        rail2Metarial8.addEventListener(rail2Metarial8.event.add, event => {
            mmiEquipment.toLoadRail2(rail2Metarial8);
        });
    }

    initDownloadEquipment() {
        let downloadEquipment = new DownloadEquipment(this);
        let rail1Metarial10 = metarialMap.get('轨道1物料10');
        let rail2Metarial10 = metarialMap.get('轨道2物料10');
        let _defectiveMetarial8 = metarialMap.get('灰色物料8');

        //downloadEquipment.toLoadRail1();
        //上一个工站，会触发添加事件
        rail1Metarial10.addEventListener(rail1Metarial10.event.add, event => {
            //驱动四轴机器人4来取料
            downloadEquipment.toLoadRail1(rail1Metarial10);
        });

        rail2Metarial10.addEventListener(rail2Metarial10.event.add, event => {
            downloadEquipment.toLoadRail2(rail2Metarial10);
        });
        _defectiveMetarial8.addEventListener(_defectiveMetarial8.event.add, event => {
            downloadEquipment.toLoadRail2(_defectiveMetarial8);
        });
    }

    //隐藏掉所有物料，被驱动。
    disableAllMetarial() {
        for (let i = 1; i < 3; i++) {//2条轨道
            for (let y = 1; y < 11; y++) {
                let _t = this.getMetrail('轨道' + i + '物料' + y);
                _t.disable();
            }
        }
        this.getMetrail('完成绿色物料').disable();//下料OK
        this.getMetrail('完成灰色物料').disable();//下料NG
    }


    init(containerId, modelUrl) {
        animationUtil.init(containerId);
        if (this.model){
            this.model.position.y = 200;
            //console.log(object, 'pro')
            //object.position.x = 500;
            //object.rotateX(-(Math.PI/2)*0.2);
            // object.rotateY((Math.PI/2));
            this.model.scale.set(1.1, 1.1, 1.1);
            //this.model = object;
            this.disableAllMetarial();
            animationUtil.addFbxToScene(this.model);
            this.animate();
            return Promise.resolve(this.model);
        }
        //加载模型
        let promise = animationUtil.loadFbx(modelUrl);
        return promise.then(((object) => {
            //調整位置
            object.position.y = 200;
            console.log(object, 'pro')
            //object.position.x = 500;
            //object.rotateX(-(Math.PI/2)*0.2);
            // object.rotateY((Math.PI/2));
            object.scale.set(1.1, 1.1, 1.1);
            this.model = object;
            this.disableAllMetarial();
            this.animate();
            this.times = 0;
        })).catch(error => {
            console.error('load model:  ' + JSON.stringify(error));
        });
    }

    //render animation
    animate = function () {
        // this.animation();
        //this.times++;
        //if (this.times < 20)
        // setInterval(() => {
        //     animationUtil.renderOnly();
        // }, 1000);
        if (isStop)
            return;
        animationUtil.render(this.animate);
    }.bind(this);

    //需要动的，一般使用RailMetarial(有事件)，不然，建议使用metarial
    getMetrail(name) {
        if (metarialMap.has(name)) return metarialMap.get(name);
        let _m = animationUtil.getMeshByName(this.model, name);
        _m = new RailMetarial(_m, animationUtil, name);
        metarialMap.set(name, _m);
        return _m;
    }

    getMachine(name) {
        if (machineMap.has(name)) return machineMap.get(name);
        let _m = animationUtil.getMeshByName(this.model, name);
        _m = new Machine(_m, animationUtil, name);
        machineMap.set(name, _m);
        return _m;
    }

    getMeshByName(name) {
        return animationUtil.getMeshByName(this.model, name);
    }

}

export default new ProductAnimation();