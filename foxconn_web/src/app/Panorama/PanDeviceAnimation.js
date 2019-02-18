import AnimationUtil from '@/utils/AnimationUtil';
import RailMetarial from '@/utils/RailMetarial';
import Machine from '@/utils/Machine';
import * as THREE from 'three'
 

let animationUtil = new AnimationUtil();
let metarialMap = new Map();
let machineMap = new Map();
let mixers=[];
let animations=new Map();
let clock = new THREE.Clock(); 
let loadMuodle;
// let pos = 0;
// let  movingpath
class PanDeviceAnimation{
    constructor(pointLight,curve){
        this.pointLight=pointLight
        this.curve=curve
    }
    
    init(containerId, modelUrl) {
        animationUtil.init(containerId,true);
        //加载模型
        let promise = animationUtil.loadFbx(modelUrl);
        return promise.then((object) => {
            console.log(object)
            loadMuodle=object
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);
            this.splitAnimatinClip(animationUtil.resetAnimation(object.animations))

            object.position.z = -150;
            object.position.y= 20;
            object.rotateX((Math.PI*2)/24);
            object.rotateY((Math.PI*2)/4);
            object.scale.set(0.6,0.6,0.6);
            this.model = object;
            this.animate();
           
        }).catch(error => {
            console.error('load model:  ' + JSON.stringify(error));
        });
    }
 
  
    //渲染动画
    animate = function () {
        animationUtil.render(this.animate);
        // let ball=loadMuodle.getObjectByName('ball')
        // if(ball){
        //     if(pos < 1){
        //         ball.position.x=movingpath.getPointAt(pos).x
        //         ball.position.y=movingpath.getPointAt(pos).y
        //         ball.position.z=movingpath.getPointAt(pos).z
        //         pos += 0.01
        //     }else{
        //         pos = 0;
        //     }
        // }

        if ( mixers.length > 0 ) { //动画
            for ( var i = 0; i < mixers.length; i ++ ) {
                mixers[ i ].update( clock.getDelta() );
            }

        }

    }.bind(this);


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

    splitAnimatinClip(animationsClip){//拼接天车动画
        let reg=/天车\d+/ig //天车
        let agv=/AGV/g //agv
        let ani=[]
        for(let i=0;i<animationsClip.length;i++){
            if(reg.test(animationsClip[i].name)){
                reg.lastIndex=0;
                animationsClip[i].tracks=[animationsClip[i].tracks[0],animationsClip[i+1].tracks[0],animationsClip[i+2].tracks[0]]
                ani.push(animationsClip[i])
            }
             if(agv.test(animationsClip[i].name)){
                agv.lastIndex=0;
                ani.push(animationsClip[i])
            }
        }
        ani.forEach(item=>{
            animations.set(item.name,item)
        })
    }

 

    /**
     * 
     * @param {*} text1 主显视字
     * @param {*} text2 提示
     * @param {*} group 显视位置
     * @param {*} size 字体大小
     */
    initFont(text1,text2,group,size, option){ //修改文本
        let   fontGroup = animationUtil.getMeshByName(loadMuodle, group);
        if (!fontGroup)return;
        let _size = option && option.fontSize;
        let font = animationUtil.loadFont();
                font.then((obj)=>{
                let g = new THREE.TextGeometry(text1,{
                    // 设定文字字体，
                    font:obj,
                    //尺寸
                    size:size||20,
                    //厚度
                    height:1,
                    curveSegments: 5
                });
                let g1 = new THREE.TextGeometry(text2,{
                    // 设定文字字体，
                    font:obj,
                    //尺寸
                    size: _size||10,
                    //厚度
                    height:1,
                    curveSegments: 5
                });
                //计算边界，暂时不用管
                g.computeBoundingBox();
                g1.computeBoundingBox();
                //3D文字材质
                let m = new THREE.MeshBasicMaterial();
                let m1 = new THREE.MeshBasicMaterial();
                let mesh = new THREE.Mesh(g,m);
                let mesh1 = new THREE.Mesh(g1,m1);
                    // 加入到场景中
                //debugger;
                            mesh1.position.y= mesh1.position.z-20;
                            mesh.geometry.center()
                            if (option && option.messColor){
                                mesh.material.color = option.messColor;
                            }
                            if (option && option.left){
                                mesh.position.x = option.left;
                            }
                            mesh1.geometry.center()
                            mesh1.material.color={r:255,g:0,b:0}
                            fontGroup.add(mesh);  
                            fontGroup.add(mesh1);  
                })
     
       
    }

    initMet(num){ //运行天车
        let action = mixers[0].clipAction(animations.get(num+'.position'));
        action.clampWhenFinished=false  //运动结束后回到初始状态
        action.repetitions=1 // 动画重复次数
        action.reset();//重置动画 以便下次调用
        action.num = num;
        action.play()
        return action;
    }
    
  /*
        线的终点坐标 100 0 0 
        1-21各个点的坐标
        ( -760,0 , -800) ( -760,0 , -720) ( -760,0 , -630)  ( -760,0 , -550)
        ( -310,0 , -400) ( -310,0 , -310) ( -310,0 , -220)  ( -310,0 , -140)  ( -310,0 , -60)   ( -310,0 , 30)
        ( -770,0 , 190)  ( -770,0 , 275)  ( -770,0 , 355)   ( -770,0 , 440)   ( -770,0 , 520)
        ( -700,0 , 840)  ( -610,0 , 840)   ( -520,0 , 840)  ( -440,0 , 840)   ( -350,0 , 840)  ( -260,0 , 840)

    
    */ 
   

   movePath(start){  //运动轨迹 和运动球体
    let  movingpath = new THREE.CatmullRomCurve3([ //运动轨迹
        new THREE.Vector3(start.x,start.y , start.z),
        new THREE.Vector3((start.x)/2,(start.y)/2 +200 , (start.z)/2),
        new THREE.Vector3(100,0 , 0)
    ]);
    let points = movingpath.getPoints( 50 );    
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    let material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    let line = new THREE.Line( geometry, material );
        loadMuodle.add(line) 
   
    let ballGeometry=new THREE.SphereGeometry(10,100 ,100); //创建几何球体
    //定义一种材质，显示为线框
    let ballMaterial = new THREE.MeshBasicMaterial({color:0xFF0000,wireframe:true}); //球体材质
    //网孔(Mesh)是用来承载几何模型的一个对象，可以把材料应用到它上面
    let ball=new THREE.Mesh(ballGeometry, ballMaterial);
       // ball.name="ball"
        ball.position.x=start.x
        ball.position.y=start.y 
        ball.position.z=start.z
    loadMuodle.add(ball) 
    return {path: movingpath, ball: ball, pos: 0, line: line}
}

    reRender(fn){
        animationUtil.render(fn);
    }

    remove(obj){
        loadMuodle.remove(obj);
    }

    getMixer(){
        return mixers[0];
    }

    getGroup(groupName){
        return animationUtil.getMeshByName(loadMuodle, groupName);
    }

}

export default new PanDeviceAnimation();