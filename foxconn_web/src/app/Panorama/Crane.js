//天车(下料点)， 因为下料点和天车是一一对应的， 一个下料点一个天车在运动着。
import { EventDispatcher } from 'three';
import connector from './Connector';
import AxiosHttp from '@/utils/AxiosHttp';
import PanDeviceAnimation from './PanDeviceAnimation';
let starving = '无物料', full = '满物料', nothing = '物料不足';


/**
 * 1. 保存着天车的属性： 如要送到那个站点， 那一个天车
 * 2. 定时去请求运料需求，如果，表中有运料需要，会触发天车去运料
 */
class Crane{
    constructor(target){
        this.target = target;//target存着下料点的状态
        if (target.MaterialStatus == starving){
            connector.addStarving(this);
        }
        this.curId = 0;
        setInterval(this.retrieveActionRequirement.bind(this), 5000);
    }

    resetFont(){
        if (this.target.MaterialNo){
            let group = PanDeviceAnimation.getGroup(''+this.target.StationOrder);
            let children = group.children;
            if (children.length > 1){
                for (let index = children.length - 1; index > -1; index--) {
                    const element = children[index];
                    group.remove(element);
                }
            }
            let crameGroup = PanDeviceAnimation.getGroup(this.target.StationName+'_text');//查找字体某一个group
            children = crameGroup.children;
            for (let index = children.length - 1; index > 0; index--) {
                const element = children[index];
                if (element.geometry.type == "TextGeometry"){
                    crameGroup.remove(element);
                }
            }
            if (this.target.MaterialStatus == starving || this.target.MaterialCount <= 0){
                 connector.addStarving(this);
            }
            PanDeviceAnimation.initFont(this.target.StationNo, this.target.MaterialNo+'('+this.target.MaterialCount+')', ''+this.target.StationOrder, 15, {fontSize: 10});         
        }
    }

    getOrder(){
        return this.target.StationOrder;
    }

    getMaterialStatus(){
        return this.target.MaterialStatus;
    }

    getCount(){
        return this.target.MaterialCount;
    }

    getStationNo(){
        return this.target.StationNo;
    }

    //定时获取上料信息
    retrieveActionRequirement(){
        let local = this;
        AxiosHttp.get('/panorama/loadStatusOfFeeding/'+this.target.StationNo).then(res=>{
           
            if (!res || !res.count)return;
            let rows = res.rows;
            let row = rows[0];
            if (local.curId == row.ID)return;
            local.curId = row.ID;
            //驱动天车，发现有上料信息时
            PanDeviceAnimation.initFont(row.MaterialName, ''+row.MaterialCount, local.target.StationName+'_text', 10, {messColor: {r:0.003921568627451,g:0.7529411764705882,b:1}});

            let action = PanDeviceAnimation.initMet(local.target.StationName);
            let timer = setInterval(()=>{
                if (!action.enabled){
                    local.resetFont();
                    clearInterval(timer);
                }
            }, 500);

            /** 
             * 根据下料点的名称去获取下料点的实时状态
            */
            AxiosHttp.get('/panorama/loadStatusOfStationByName/'+local.target.StationNo).then(res=>{
               
                // local.count = res[0].Count;
                // local.metarialNo = res[0].MaterialNo;
                local.target = res[0];
                console.log('local.ID: ', res[0].ID);
                console.log('local.MaterialCount: ', res[0].MaterialCount);
                // if (local.count <= 0)
                //     local.resetFont();
                // if (local.count <= 0){
                //     connector.addStarving(local);
                // }
            })
        });
    }

}
Object.assign(Crane.prototype, EventDispatcher.prototype);
Crane.starving = starving;
export default Crane;
