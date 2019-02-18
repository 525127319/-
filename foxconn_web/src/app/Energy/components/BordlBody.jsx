import React ,{Component} from 'react'
import DayDataList from './components/DayDataList.jsx'
import DayDataChart from './components/DayDataChart.jsx'
import WeekDataList from './components/WeekDataList.jsx'
import WeekDataChart from './components/WeekDataChart.jsx'
export default class BordlBody extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }
   

    render(){
        return(
        <div className='main-body'>
            <div className='day-bord'>
                <DayDataList></DayDataList>
                <DayDataChart></DayDataChart>
            </div>
            <div className='week-bord'>
                <WeekDataList></WeekDataList>
                <WeekDataChart dd={this.state.dan}></WeekDataChart>
            </div>
        </div>
           
        )
    }
    
}