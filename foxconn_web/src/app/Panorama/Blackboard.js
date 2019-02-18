import { EventDispatcher } from "three";
import connector from './Connector';
import PanDeviceAnimation from './PanDeviceAnimation';
let array= ['text1', 'text2', 'text3', 'text4'];
let index = 0;

class Blackboard{

    addListener(){
        connector.addEventListener(connector.events.TO_BLACK, this.listener.bind(this));
    }

    listener(event){
        this.showContent(event.context);
    };

    showContent(crame){
        if (index >= array.length) index = 0;
        let _index = index++;
        let group = PanDeviceAnimation.getMeshByName(array[_index]);
        let children = group.children;
        if (children.length >= 2){
            for (let index = children.length - 1; index > 0; index--) {
                const element = children[index];
                group.remove(element);
            }
        }
        let getStationNo = crame.getStationNo();
        let getMaterialStatus = crame.getMaterialStatus();

        PanDeviceAnimation.initFont(getStationNo + ','+getMaterialStatus, '', array[_index], 15, {left: 20});
    }

}




Object.assign(Blackboard.prototype, EventDispatcher.prototype);

export default new Blackboard();
