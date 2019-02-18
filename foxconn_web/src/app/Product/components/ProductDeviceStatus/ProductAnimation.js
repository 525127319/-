import * as THREE from 'three'
import AnimationUtil from '@/utils/AnimationUtil';
import RailMetarial from '@/utils/RailMetarial';
import Machine from '@/utils/Machine';
import AxiosHttp from '@/utils/AxiosHttp.js'
import ShieldEquipment from './ShieldEquipment'; //四轴机械臂1
import VoiceEquipment from './VoiceEquipment';  //四轴机械臂2
import CameraEquipment from './CameraEquipment'; //六轴机械臂2
import MMIEquipment from './MMIEquipment';  //四轴机械臂3
import DownloadEquipment from './DownloadEquipment';//四轴机械臂4
import SixMachine1 from './InitSixMachine1' //第一个六轴机器人
let animationUtil = new AnimationUtil();
let metarialMap = new Map();
let machineMap = new Map();
let actionData=[
{count: 0},
{count: 0},
{count: 0},
{count: 0},
{count: 0},
{count: 0}
]
class ProductAnimation {
    
    initData(){
        this.SixMachine1=new SixMachine1(this);
        this.shieldEquipment = new ShieldEquipment(this);
        this.voiceEquipment = new VoiceEquipment(this);
        this.cameraEquipment = new CameraEquipment(this);
        this.mmiEquipment = new MMIEquipment(this);
        this.downloadEquipment = new DownloadEquipment(this);

        this.rail1Metarial1 = metarialMap.get('轨道1物料1');
        this.rail1Metarial2 = metarialMap.get('轨道1物料2');
        this.rail1Metarial3 = metarialMap.get('轨道1物料3');
        this.rail1Metarial5 = metarialMap.get('轨道1物料5');
        this.rail1Metarial8 = metarialMap.get('轨道1物料8');
        this.rail1Metarial10 = metarialMap.get('轨道1物料10');

        this.rail2Metarial1 = metarialMap.get('轨道2物料1');
        this.rail2Metarial2 = metarialMap.get('轨道2物料2');
        this.rail2Metarial3 = metarialMap.get('轨道2物料3');
        this.rail2Metarial5 = metarialMap.get('轨道2物料5');
        this.rail2Metarial8 = metarialMap.get('轨道2物料8');
        this.rail2Metarial10 = metarialMap.get('轨道2物料10');

        this._defectiveMetarial8=metarialMap.get('灰色物料8');
        this.finishGoodMateral=metarialMap.get('完成绿色物料');
        this.finishBadMateral=metarialMap.get('完成灰色物料');
    }
    handleActionData(res){
        let result=res.value
        if(res.ok===1&&result.length){
            result.map((item)=>{
               if(/l/i.test(item.rows[0].StartStationNo)){
                item.rows[0].StartStationNo=[...item.rows[0].StartStationNo][1]*1
               }
               if(/l/i.test(item.rows[0].TargetStationNo)){
                item.rows[0].TargetStationNo=[...item.rows[0].TargetStationNo][1]*1
               }
               return item
            })
            // console.log('result',result)
            result.forEach(item=>{
                let data=item.rows[0]
                // console.log(item)
                switch(data.CellName){
                    case "Cell1":
                    if(item.count!==actionData[0].count){
                        this.SixMachine1.addMateral({angle: 1.5, action: 'retrieve',start:data.StartStationNo,target:data.TargetStationNo})//六轴1下料
                    }
                    break;
                    case 'Cell2':
                    if(item.count!==actionData[1].count){
                        if(data.StartStationNo===1||data.TargetStationNo===1){
                            this.rail1Metarial1.add({start:data.StartStationNo,target:data.TargetStationNo}) //四轴1轨道1上物料
                        }else{
                            this.rail2Metarial1.add({start:data.StartStationNo,target:data.TargetStationNo}) //轴1轨道2上物料
                        }
                    }
                    break;
                    case 'Cell3':
                    if(item.count!==actionData[2].count){
                        if(data.StartStationNo===1||data.TargetStationNo===1){
                            this.rail1Metarial3.add({start:data.StartStationNo,target:data.TargetStationNo}) //四轴2轨道1上物料
                        }else{
                            this.rail2Metarial3.add({start:data.StartStationNo,target:data.TargetStationNo}) //轴2轨道2上物料
                        }
                    }
                    break;
                    case 'Cell4':
                    if(item.count!==actionData[3].count){
                        if(data.StartStationNo===1 ){
                            this.rail1Metarial5.add({start:data.StartStationNo,target:data.TargetStationNo}) //六轴2轨道1
                        }else{
                            this.rail2Metarial5.add({start:data.StartStationNo,target:data.TargetStationNo}) //六轴2轨道2
                        }
                    }
                    break;
                    case 'Cell5':
                    if(item.count!==actionData[4].count){
                        if(data.StartStationNo===1||data.TargetStationNo===1){
                            this.rail1Metarial8.add({start:data.StartStationNo,target:data.TargetStationNo}) //四轴3轨道1上物料
                        }else{
                            this.rail2Metarial8.add({start:data.StartStationNo,target:data.TargetStationNo}) //轴3轨道2上物料
                        }
                    }
                    break;
                    default :
                    if(item.count!==actionData[5].count){
                        if(data.StartStationNo===1){
                            this.rail1Metarial10.add({start:data.StartStationNo,target:data.TargetStationNo});//四轴4 
                        }else if(data.StartStationNo===2){
                            this.rail2Metarial10.add({start:data.StartStationNo,target:data.TargetStationNo});//四轴4 
                        }else{
                            this._defectiveMetarial8.add({start:data.StartStationNo,target:data.TargetStationNo});//四轴4 
                        }
                    }
                    break;

                }
            })

                actionData=result
          
            // console.log(actionData)
        }
        
    }
    getActionData(){
        setInterval(()=>{ 
            if(!document.hidden&&window.location.hash==='#/product'){
                AxiosHttp.post('/product/actionData')
                .then(
                    res=>{
                        this.handleActionData(res)
                    }
                )
                .catch(err=>{
                    console.log(err)
                })
                // this.SixMachine1.addMateral({angle: 1.5, action: 'retrieve',start:1,target:2});//六轴1下料

                // this.rail1Metarial1.add({start:2,target:'M2'}) //四轴1上物料
                // this.rail2Metarial1.add({start:2,target:'M2'}) //四轴1上物料
                // this.rail1Metarial1.add({start:'M6',target:1})//四轴1下物料
                
                // this.rail1Metarial3.add({start:'M3',target:1});//四轴2下料
                // this.rail1Metarial3.add({start:1,target:'M3'});//四轴2取料
                   
                // this.rail1Metarial5.add({start:1,target:1}); //驱动六轴机器人2来取料及下料

                // this.rail1Metarial8.add({start:2,target:'M2'});//四轴机械臂3 取料测试
                // this.rail1Metarial8.add({start:'M3',target:1});//四轴机械臂3 测试完下料
                
                // this.rail1Metarial10.add({start:1,target:2});
                // this.downloadEquipment.add();
                // this.downloadEquipment.add();
                AxiosHttp.post('/product/stationStatus')
                .then(
                    res=>{
                        if(res.ok===1&&res.value.length){
                            res.value.forEach(item=>{
                                switch(item.WorkstationStatus){
                                 case 0:this.getMetrail(item.WorkstationOrder).meterial.children[1].material.color= {r: 0.09137055837563457, g: 0.09137055837563457, b: 0.09137055837563457}
                                     break;
                                 case 1:this.getMetrail(item.WorkstationOrder).meterial.children[1].material.color={r: 0.7902532316860755, g: 0.2630827112431621, b: 0.2630827112431621}
                                     break;
                                 case 2:this.getMetrail(item.WorkstationOrder).meterial.children[1].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}
                                     break;
                                 default:
                                     break;
                                 }
                            })
                            
                    }}
                )
        }

        },3000)
    }
 //誓
    initSixMachine1(){ //六轴机器人1
        // let SixMachine=new SixMachine1(this);
        this.SixMachine1.addMateral({ angle: 0 });//初始化位置
    }
 
    //初始化第一个4个机器人
    initShieldEquipment() {
        // let rail1Metarial1 = metarialMap.get('轨道1物料1');
        // let rail2Metarial1 = metarialMap.get('轨道2物料1');
        // let shieldEquipment = new ShieldEquipment(this);
        //fourMachine1.rotationY({angle: 4.7});
        this.rail1Metarial1.addEventListener(this.rail1Metarial1.event.add, event => {//当物料2-1有物料时候
            //有物料， 驱动机器人取料
            this.shieldEquipment.toLoadRail1(this.rail1Metarial1,event.message.tester_mess );
        });
        this.rail2Metarial1.addEventListener(this.rail2Metarial1.event.add, event => {//当物料1-1有物料时候
            this.shieldEquipment.toLoadRail2(this.rail2Metarial1,event.message.tester_mess );
        });
    }

    

    initMetarial2() {
        // let rail1Metarial2 = metarialMap.get('轨道1物料2');
        // let rail2Metarial2 = metarialMap.get('轨道2物料2');
        // let rail1Metarial3 = metarialMap.get('轨道1物料3');
        // let rail2Metarial3 = metarialMap.get('轨道2物料3');

        //监听物料到达第二个机器人的上料口，并上第三个物料显视出来
        this.rail1Metarial2.addEventListener(this.rail1Metarial2.event.arriveTargetStationNo, event => {
            // this.rail1Metarial3.add();
            this.rail1Metarial2.disable();
            this.rail1Metarial2.reset();
        });
        this.rail2Metarial2.addEventListener(this.rail1Metarial2.event.arriveTargetStationNo, event => {
            // this.rail2Metarial3.add();
            this.rail2Metarial2.disable();
            this.rail2Metarial2.reset();
        });
    }


    initVoiceEquipment() {  //驱动四轴2取料
        // let voiceEquipment = new VoiceEquipment(this);
        // let rail1Metarial3 = metarialMap.get('轨道1物料3');
        // let rail2Metarial3 = metarialMap.get('轨道2物料3');

        //voiceEquipment.rotationY({angle: 5});

        this.rail1Metarial3.addEventListener(this.rail1Metarial3.event.add, event => {
            //驱动四轴机器人2来取料
            this.voiceEquipment.toLoadRail1(this.rail1Metarial3,event.message.tester_mess);
        });

        this.rail2Metarial3.addEventListener(this.rail2Metarial3.event.add, event => {
            this.voiceEquipment.toLoadRail2(this.rail2Metarial3,event.message.tester_mess);
        });
    }

    initCameraEquipment() {
        // let cameraEquipment = new CameraEquipment(this);
        // let rail1Metarial5 = metarialMap.get('轨道1物料5');
        // let rail2Metarial5 = metarialMap.get('轨道2物料5');

        //cameraEquipment.toLoadRail1(rail1Metarial4);

        this.rail1Metarial5.addEventListener(this.rail1Metarial5.event.add, event => {
            //驱动四轴机器人2来取料
            this.cameraEquipment.toLoadRail1(this.rail1Metarial5,event.message.tester_mess);
        });

        this.rail2Metarial5.addEventListener(this.rail2Metarial5.event.add, event => {
            this.cameraEquipment.toLoadRail2(this.rail2Metarial5,event.message.tester_mess);
        });
    }

    initMMIEquipment() {
        // let mmiEquipment = new MMIEquipment(this);
        // let rail1Metarial8 = metarialMap.get('轨道1物料8');
        // let rail2Metarial8 = metarialMap.get('轨道2物料8');

       // mmiEquipment.toLoadRail1();
        //上一个工站，会触发添加事件
        this.rail1Metarial8.addEventListener(this.rail1Metarial8.event.add, event => {
            //驱动四轴机器人3来取料
            this.mmiEquipment.toLoadRail1(this.rail1Metarial8,event.message.tester_mess);
        });

        this.rail2Metarial8.addEventListener(this.rail2Metarial8.event.add, event => {
            this.mmiEquipment.toLoadRail2(this.rail2Metarial8,event.message.tester_mess);
        });
    }

    initDownloadEquipment() {
        // let downloadEquipment = new DownloadEquipment(this);
        // let rail1Metarial10 = metarialMap.get('轨道1物料10');
        // let rail2Metarial10 = metarialMap.get('轨道2物料10');
        // let _defectiveMetarial8=metarialMap.get('灰色物料8');
        // this.finishGoodMateral=metarialMap.get('完成绿色物料');
        // this.finishBadMateral=metarialMap.get('完成灰色物料');
        //downloadEquipment.toLoadRail1();
        //上一个工站，会触发添加事件
        this.rail1Metarial10.addEventListener(this.rail1Metarial10.event.add, event => {
            //驱动四轴机器人4来取料
            this.finishGoodMateral.disable()
            this.downloadEquipment.toLoadRail1(this.rail1Metarial10,event.message.tester_mess);
        });

        this.rail2Metarial10.addEventListener(this.rail2Metarial10.event.add, event => {
            this.finishGoodMateral.disable()
            this.downloadEquipment.toLoadRail2(this.rail2Metarial10,event.message.tester_mess);
        });
        this._defectiveMetarial8.addEventListener(this._defectiveMetarial8.event.add, event => {
            this.finishBadMateral.disable()
            this.downloadEquipment.toLoadRail2(this._defectiveMetarial8,event.message.tester_mess);
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
        //加载模型
        let promise = animationUtil.loadFbx(modelUrl);
        return promise.then(((object) => {
            //調整位置
            object.position.y = 200;
            console.log(object,'pro')
            object.position.x = 150;
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


    initFont=(text,group,size,mes)=>{ //修改文本

        let font = animationUtil.loadFont();
                font.then((obj)=>{
                let g = new THREE.TextGeometry(text,{
                    // 设定文字字体，
                    font:obj,
                    //尺寸
                    size:size||20,
                    //厚度
                    height:2,
                    curveSegments: 5
                });
                //计算边界，暂时不用管
                g.computeBoundingBox();
                //3D文字材质
                let m = new THREE.MeshBasicMaterial();
                let mesh = new THREE.Mesh(g,m);
            
                    // 加入到场景中
                let   fontGroup = animationUtil.getMeshByName(this.model,group);
                            //  console.log('fontGroup',fontGroup)
                        if(mes){
                           
                            fontGroup.children[0].visible = false;
                            mesh.position.copy(fontGroup.children[0].position);
                            mesh.position.z=mesh.position.z+8
                            mesh.position.y=mesh.position.y+4
                            mesh.rotation.copy(fontGroup.children[0].rotation);
                            mesh.geometry.center()
                            mesh.material.color={r: 0.8784313725490196, g: 0.6862745098039216, b: 0.30980392156862746}
                            fontGroup.add(mesh);  
                        }else{
                         
                            mesh.position.copy(fontGroup.children[0].position);
                            mesh.rotation.copy(fontGroup.children[0].rotation);
                            mesh.scale.copy(fontGroup.children[0].scale);
                            mesh.material.color={r: 0.09137055837563457, g: 0.09137055837563457, b: 0.09137055837563457}
                            // fontGroup.children.pop();
                            fontGroup.add(mesh);  
                        }
                       
                        
                })
     
       
    }

    // initStationStatus(status){ //初始化个检测工位的状态
    //     status.forEach(item=>{
    //          if(item.status==="normal"){
    //             this.getMetrail(item.name).meterial.children[0].material.color={r: 0.09137055837563457, g: 0.09137055837563457, b: 0.09137055837563457}
    //          }else if(item.status==="error"){
    //             this.getMetrail(item.name).meterial.children[0].material.color={r: 0.7902532316860755, g: 0.2630827112431621, b: 0.2630827112431621}
    //          }else if(item.status==="repair"){
    //             this.getMetrail(item.name).meterial.children[0].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}
    //          }
    //         // console.log(this.getMetrail(item.name).meterial.children[0].material.color,item.status,item.name);
    //     })
    //     // this.getMetrail(status[0].name).meterial.children[0].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}
    //     // this.getMetrail(status[0].name).meterial.children[0].children[0].children[0].material.color={r: 8.397118308078596e-17, g: 0.7563451776649747, b: 0.1512690355329951}

       
        
    // }

    //render animation
    animate = function () {
        // this.animation();
        //this.times++;
        //if (this.times < 20)
        // setInterval(() => {
        //     animationUtil.renderOnly();
        // }, 1000);
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