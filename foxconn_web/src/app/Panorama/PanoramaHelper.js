import AxiosHttp from '@/utils/AxiosHttp';
import PanDeviceAnimation from './PanDeviceAnimation';
import Crame from './Crane';
import blackboard from './Blackboard';
const stationMap = new Map();
class PanoramaHelper{

    constructor(){
        blackboard.addListener();
    }

    resetMetarialStatus(){
        AxiosHttp.get('/panorama/loadStatusOfStation').then(res=>{
            if (!res || !res.length)return;
            res.forEach(element => {
                if (element.StationName.indexOf('天车') < 0){
                    return;
                }
                stationMap.set(element.StationName, new Crame(element));//转为本地对象，更具体可操作性
                //监听运动是否完成，更新下料点的物料名&总数
                //   PanDeviceAnimation.getMixer().addEventListener('finished', event=>{
                //     if (event && event.action){
                //         stationMap.get(event.action.num).resetFont();
                //     }
                // });

                //初始化下料点的状态
                PanDeviceAnimation.initFont(element.StationNo, ''+element.MaterialCount, ''+element.StationOrder, 10)
            });
        });

    }

}

const instance = new PanoramaHelper();
//instance.init();
export default instance;