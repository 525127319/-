//画线和球
import { EventDispatcher } from "three";
import PanDeviceAnimation from './PanDeviceAnimation';
import Crame from './Crane';

let Pahts=[//下料点的位置
    {},//天车定义由1开始，所以这点个位
    {x:-760,y:0,z:-800}, {x:-760,y:0,z:-720}, {x:-760,y:0,z:-630}, {x:-760,y:0,z:-550},
    {x:-310,y:0,z:-400}, {x:-310,y:0,z:-310}, {x:-310,y:0,z:-220}, {x:-310,y:0,z:-140}, {x:-310,y:0,z:-60} , {x:-310,y:0,z:30},
    {x:-770,y:0,z:190},  {x:-770,y:0,z:275},  {x:-770,y:0,z:355},  {x:-770,y:0,z:440},  {x:-770,y:0,z:520},  
    {x:-700,y:0,z:840},  {x:-610,y:0,z:840},  {x:-520,y:0,z:840},  {x:-440,y:0,z:840},  {x:-350,y:0,z:840}, {x:-260, y:0, z:840}
];

let isStart = false;
let array = [];

class Connector{

    events={
        TO_BLACK:1
    }

    addStarving(crane){//那个下料点
        let index  = array.findIndex(element=>{
            return element.StationNo == crane.getStationNo();
        });
        //已有此站点的通知信息， 不再加进
        if (index >= 0)return;
        array.push(crane);
        if (array.length > 0 && !isStart){
            this.start();
        }
    }

    start(){
        if (array <= 0){
            isStart = false;
            return;
        }

        isStart = true;
        let crane = array.shift();
        let index = crane.getOrder();
        let path = Pahts[index];
        let lineAndBall = null;
        console.log('array.length:  ', array.length, 'isStart', isStart);
        //缺料状态，才需要发请求
        if (path && Crame.starving == crane.getMaterialStatus()){
            lineAndBall = PanDeviceAnimation.movePath(path);
            this.move(lineAndBall, crane);
        } else {
            isStart = false;
        }
    }

    move(lineAndBall, crane){
        let ball=lineAndBall.ball;
        let movingpath = lineAndBall.path;
        let local = this;
        const fn = ()=>{
            if(lineAndBall.pos < 1){
                ball.position.x = movingpath.getPointAt(lineAndBall.pos).x
                ball.position.y = movingpath.getPointAt(lineAndBall.pos).y
                ball.position.z = movingpath.getPointAt(lineAndBall.pos).z
                lineAndBall.pos += 0.05
//                let fn = local.move.bind(local, lineAndBall, crane);
                PanDeviceAnimation.reRender(_fn);
            } else {
                ball.visible = false;
                lineAndBall.line.visible = false;
                //PanDeviceAnimation.remove(ball);
                //PanDeviceAnimation.remove(lineAndBall.line);
                local.dispatchEvent({type: local.events.TO_BLACK, context: crane});
                local.start();
            }
        }
        let _fn = fn;
        _fn();
        //PanDeviceAnimation.reRender(fn);
    }

}

Object.assign(Connector.prototype, EventDispatcher.prototype);

export default new Connector();
