import React ,{Component} from 'react'
import AxiosHttp from '@/utils/AxiosHttp';

let timer = null;
export default class PanoramaFooter extends Component{
    constructor(props){
        super(props)
        this.state={
            materialHouse2SmtName: 0,
            smtName2Assembler: 0,
            assembler2ProductionName: 0,
            productionName2MaterialHouse: 0,
            materialHouse2PackageLineName: 0,
            packageLineName2FinishedProductName: 0,
            total: 0
        }
    }

    componentDidMount(){
        timer = setInterval(()=>{
            AxiosHttp.get('/panorama/loadTimeOfTransportation').then(res=>{
                if (!res || res.length <= 0) return;
                let total = 0;
                res.forEach((rs)=>{
                    total += parseFloat(rs.TransferAvgTime);
                    if (rs.StartStationNo == '原料仓' && rs.EndStationNo == '板测线'){
                        this.setState({
                            materialHouse2SmtName: rs.TransferAvgTime,
                        });
                    } else if (rs.StartStationNo == '板测线' && rs.EndStationNo == '组装线'){
                        this.setState({
                            smtName2Assembler: rs.TransferAvgTime,
                        });
                    } else if (rs.StartStationNo == '组装线' && rs.EndStationNo == '成测线'){
                        this.setState({
                            assembler2ProductionName: rs.TransferAvgTime,
                        });
                    } else if (rs.StartStationNo == '成测线' && rs.EndStationNo == '原料仓'){
                        this.setState({
                            productionName2MaterialHouse: rs.TransferAvgTime,
                        });
                    } else if (rs.StartStationNo == '原料仓' && rs.EndStationNo == '包装线'){
                        this.setState({
                            materialHouse2PackageLineName: rs.TransferAvgTime,
                        });
                    } else if (rs.StartStationNo == '包装线' && rs.EndStationNo == '成品仓'){
                        this.setState({
                            packageLineName2FinishedProductName: rs.TransferAvgTime,
                        });
                    }
                });
                this.setState({
                    total: total
                });
            });
        }, 5000);
    }

    componentWillUnmount(){
        timer = null;
    }

    render(){
        return(
            <footer className='y_footer'>
                <div className='y_footer-t'>
                    <p>
                        产品加工耗时
                    </p>
                    <p>
                        总耗时
                        <span>{this.state.total}s</span>
                    </p>
                </div>
                <ul className='y_footer-main'>
                    <li>
                         {/* 轴名字 */}
                        <span><i>原料仓</i></span>
                            {/* 时间 */}
                        <span><i>{this.state.materialHouse2SmtName}s</i></span>
                    </li>
                    <li>
                            {/* 轴名字 */}
                        <span><i>板测线</i></span>
                        <span><i>{this.state.smtName2Assembler}s</i></span>
                    </li>
                    <li>
                        {/* 轴名字 */}
                        <span><i>组装线</i></span>
                        <span><i>{this.state.assembler2ProductionName}s</i></span>
                    </li>
                    <li>
                         {/* 轴名字 */}
                         <span><i>成测线</i></span>
                        <span><i>{this.state.productionName2MaterialHouse}s</i></span>
                    </li>
                    <li>
                         {/* 轴名字 */}
                        <span><i>原料仓</i></span>
                        <span><i>{this.state.materialHouse2PackageLineName}s</i></span>
                    </li>
                    <li>
                        {/* 轴名字 */}
                        <span><i>包装线</i></span>
                        <span><i>{this.state.packageLineName2FinishedProductName}s</i></span>
                    </li>
                    <li>
                        <span className='last'><i>成品仓</i></span>
                        <span></span>
                    </li>
                </ul>
            </footer>
        )
    }
}
