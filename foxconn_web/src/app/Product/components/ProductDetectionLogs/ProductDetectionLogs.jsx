import React, { Component } from "react";
import AxiosHttp from "@/utils/AxiosHttp";
// import TimeUtil from "@/utils/TimeUtil";
import  { line, curStatus } from "@/utils/Config";

const INTERVAL = 5000;

export default class ProductDetectionLogs extends Component{
    static displayName = "ProductDetectionLogs";
    constructor(props) {
        super(props);
        this.state = {
            testerLogs: [],
        };
        this.getProductTesterData();
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if(!document.hidden&&window.location.hash==='#/product'){
                this.getProductTesterData();
            }
        }, INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // 获取工位数据
    getProductTesterData = () => {
        AxiosHttp
            .post('/product/testLogs')
            .then(this.handleTester1data);
    };

    handleTester1data = (response) =>{
       
        if(response.ok===1&&response.value.length){
            this.setState({
                testerLogs:response.value
            },()=>{
                // console.log(this.state.testerLogs)
            } )
        }
        // if(!response.value || response.value.rows.length === 0) {
        //     return;
        // }
        // if(testerLogs.length >= 30) {
        //     testerLogs.splice(0,response.value.rows.length);
        //     response.value.rows.forEach(item => {
        //         testerLogs.push(item);
        //     });
        // }else {
        //     response.value.rows.forEach(item => {
        //         testerLogs.push(item);
        //     });
        // }
   
    }

    renderTableContent = () => {
        return this.state.testerLogs.map((item, index) => {
            return (
                <li key={item.ID}>
                    <p>
                        <span>编号</span><span>{item.WorkstationNo}</span>
                    </p>
                    <p>
                        <span>状态</span><span>{item.CurStatus}</span>
                    </p>
                    <p>
                        <span>完成数</span><span>{item.FinishedNum}</span>
                    </p>
                    <p>
                        <span>良品数</span><span>{item.YieldNumber}</span>
                    </p>
                    <p>
                        <span>次品数</span><span>{item.Inferior}</span>
                    </p>
                </li>
            )
           
        })
    };

    render() {
        return (
            <footer>
                <ul>
                    {this.renderTableContent()}
                </ul>
            </footer>
        )
    }
}