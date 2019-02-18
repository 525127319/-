import React ,{ Component} from 'react'
let timer=null
export default class BordlHead extends Component{
    constructor(props) {
        super(props);
        this.state={
            date:''
        }
    }
    fomateDate=()=>{
        let today=new Date()
        let yy =today.getFullYear();
        let mm = today.getMonth()+1;
        let dd =today.getDate();
        let ww=today.getDay();
        let hh=today.getHours();
        let min=today.getMinutes();
        let ss=today.getSeconds();
        switch(ww){
            case 1:ww='一';
            break
            case 2:ww='二';
            break
            case 3:ww='三';
            break
            case 4:ww='四';
            break
            case 5:ww='五';
            break
            case 6:ww='六';
            break
            default:ww='天';
            break;
        };
        this.setState({date:`${yy} 年 ${mm} 月 ${dd} 日  ${this.toDouble(hh)}:${this.toDouble(min)}:${this.toDouble(ss)}  星期${ww}`  })
    }
    toDouble=(tt)=>{
        if(tt<10){
            tt='0'+tt;
            return tt
        }else{
            return tt
        }
    }
componentWillMount(){
    this.fomateDate()
     timer= setInterval( ()=>this.fomateDate(),1000);
}
componentWillUnmount(){
    clearInterval(timer)
}
    render(){
        return(
            <header className='head no-magin' >
                <h1 className='board-title'>物流看板</h1>
                <p className='top-bar'>
                    <span className=' icon icon-dili'></span>
                    北京富士康
                </p>
                <p className='top-bar'>
                    {this.state.date &&  <span className='date'>
                        {this.state.date}
                    </span>}
                </p>
            </header>
        )
    }
}