import React ,{Component} from 'react'


export default class Logs extends Component{
    constructor(props){
        super(props)
        this.state={
            progress:[
                {   id:0,
                    number:'201807280010',
                    name:'1号电池',
                    position:'天车1号',
                    status:'运输中',
                    inTime:'2017/07/28 16:22:25'
                },
                {   id:1,
                    number:'201807280010',
                    name:'1号电池',
                    position:'天车1号',
                    status:'运输中',
                    inTime:'2017/07/28 16:22:25'
                },
                {   id:2,
                    number:'201807280010',
                    name:'1号电池',
                    position:'天车1号',
                    status:'运输中',
                    inTime:'2017/07/28 16:22:25'
                },
                {   id:3,
                    number:'201807280010',
                    name:'1号电池',
                    position:'天车1号',
                    status:'运输中',
                    inTime:'2017/07/28 16:22:25'
                } 
            ],
            historyLogs:[
                {   id:0,
                    position:'1号AGV',
                    inTime:'2017/07/28 16:22:25',
                    holdOnTime:'15min',
                    leaveTime:'2017/07/28 16:22:25',
                    status:'通过',
                },
                {   id:1,
                    position:'1号AGV',
                    inTime:'2017/07/28 16:22:25',
                    holdOnTime:'15min',
                    leaveTime:'2017/07/28 16:22:25',
                    status:'通过',
                },
                {   id:2,
                    position:'1号AGV',
                    inTime:'2017/07/28 16:22:25',
                    holdOnTime:'15min',
                    leaveTime:'2017/07/28 16:22:25',
                    status:'通过',
                },
                {   id:3,
                    position:'1号AGV',
                    inTime:'2017/07/28 16:22:25',
                    holdOnTime:'15min',
                    leaveTime:'2017/07/28 16:22:25',
                    status:'通过',
                } 
            ]
        }
    }




    render(){
        return(
            <footer className='panorama-logs' > 
                <div className='logs'>
                    <h3 className='log-title'>物料加工进度表</h3>
                    <table className='table-head'>
                        <thead>
                            <tr>
                                <th>
                                    物料编号
                                </th>
                                <th>
                                    物料名称
                                </th>
                                <th>
                                    当前位置
                                </th>
                                <th>
                                    状态
                                </th>
                                <th>
                                    进入时间
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div className='table-content'>
                        <table className='table-body'>
                            <tbody>
                                {
                                    this.state.progress.map(item=>{
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.number}</td>
                                                <td>{item.name}</td>
                                                <td>{item.position}</td>
                                                <td>{item.status}</td>
                                                <td>{item.inTime}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='logs'>
                    <h3 className='log-title'>201807240018的加工历史</h3>
                    <table className='table-head'>
                        <thead>
                            <tr >
                                <th>
                                    位置
                                </th>
                                <th>
                                    进入时间
                                </th>
                                <th>
                                    停留时间
                                </th>
                                <th>
                                    离开位置
                                </th>
                                <th>
                                    最终状态
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div className='table-content'>
                        <table className='table-body'>
                            <tbody>
                                {
                                    this.state.historyLogs.map(item=>{
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.position}</td>
                                                <td>{item.inTime}</td>
                                                <td>{item.holdOnTime}</td>
                                                <td>{item.leaveTime}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </footer>
        )
    }
}