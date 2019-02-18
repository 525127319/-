import React ,{Component} from 'react'
import BordlHead from './components/BordlHead'
import BordlBody from './components/BordlBody.jsx'
import './Energy.less'
export default class Environment extends Component {
    constructor(props) {
            super(props);
            this.state={}
    }
    render(){
        // let getCheckInfo = JSON.parse(localStorage.getItem("data"));
        // if (getCheckInfo == null) {
        //     this.props.history.push("/login");
        // }
        return(
            <article className='main-en'>
                <BordlHead/>
                <BordlBody/>
            </article>
        )
    }
}