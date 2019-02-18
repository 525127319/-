import React ,{Component} from 'react'
import PanDeviceAnimation from '../../PanDeviceAnimation'
import PanoramaHelper from '../../PanoramaHelper';
 
export default class PanoramaMoudle extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:true
        }
    }

    // 天车文本：  文本，文本_1 ~ 文本_20
    // 上料点文本：
    //（1 ~ 4）  挤压_4_4 ， 挤压_1_4  挤压_2_5 挤压_3_5 
    //（5 ~ 10） 挤压_2_2 挤压_1_2 挤压_2_3 挤压_3_2 挤压_4_2 挤压_5_2
    //（11 ~ 15） 挤压_3_3 挤压_1_3 挤压_2_4 挤压_3_4 挤压_4_3
    //（16 ~ 21） 挤压 挤压_1 挤压_2 挤压_3 挤压_4 挤压_5 
componentDidMount(){
    PanDeviceAnimation.init('panorama', '/models/transition20180911.fbx').then((()=>{
        this.setState({loading:false}) 
       
       //PanDeviceAnimation.initFont("物料名称，200个","12min","2",10)//天车文本 （文本 ~ 文本_20）
        // for (let index = 1; index < 22; index++) {
        //  PanDeviceAnimation.initFont("缺料","",""+index,10)//天车文本 （文本 ~ 文本_20）
        // }

        //PanDeviceAnimation.initFont("缺料","",""+1,10);

        PanoramaHelper.resetMetarialStatus();
   
       // PanDeviceAnimation.initFont("缺料","12min","2",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("缺料","12min","3",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("缺料","12min","4",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","5",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","6",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","7",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","8",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","9",10)//天车文本 （文本 ~ 文本_20）
    //    PanDeviceAnimation.initFont("","缺料","10",10)//天车文本 （文本 ~ 文本_20）

//       PanDeviceAnimation.movePath(Pahts[1]) //光球运动轨迹
  
        //PanDeviceAnimation.initMet('天车1') //AGV1_6
    }));

}


    render(){
        // let getCheckInfo = JSON.parse(localStorage.getItem("data"));
        // if (getCheckInfo == null) {
        //     this.props.history.push("/login");
        // }
        return(
            <section className='panorama' >
                {this.state.loading &&  <div className='loading-moudle'></div>}
                <div  id='panorama'></div>
            </section>
        )
    }
}