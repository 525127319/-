import React, { Component } from "react";
//import Stats from "three-stats";
import { msgType } from "@/utils/Config";
// import Client from "@/utils/WebsocketClient";
import productAnimation from './ProductAnimation';


//console.log('Stats',  Stats);
export default class ProductDeviceStatus extends Component{
    static displayName = "ProductDeviceStatus";
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        };
        // let subject = Client.on({ msgType: msgType.robotPosition });
        // subject.subscribe(this.robotPosition);
    }
    // robotPosition = function(response) {
    //     console.log(response);
    // };

    componentDidMount(){
        productAnimation.init('product', '/models/product2018072502.fbx').then((()=>{
            this.initObj();
            this.setState({loading:false})
        }));
    }


    componentWillUnmount(){
        console.log('unmount.......ProductDeviceStatus..');
        productAnimation.stop();
    }

    initObj(){
        productAnimation.initMetarial2();
        productAnimation.initMetarial1();
        productAnimation.initShieldEquipment();//第一个八卦
        productAnimation.initSixMachine1();
        productAnimation.initVoiceEquipment();//第二个八卦
        productAnimation.initCameraEquipment();//第二个六轴机器人--摄象头
        productAnimation.initMMIEquipment();//第三个八卦
        productAnimation.initDownloadEquipment();//下料设备
        productAnimation.start();

    }

    render() {
        return (
            <section className="product-main three-muodle">
                {this.state.loading &&  <div className='loading-moudle'></div>}
                <div id="product"></div>
            </section>
        )
    }

}