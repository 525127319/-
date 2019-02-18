import React ,{Component} from 'react'
import PanoramaHeader from './components/PanoramaHeader/PanoramaHeader'
import PanoramaMuodle from './components/PanoramaMuodle/PanoramaMuodle'
import PanoramaFooter from './components/PanoramaFooter/PanoramaFooter'
import Logs from './components/Logs/Logs'
import './Panorama.less'
export default class Panorama extends Component{
    constructor(props) {
        super(props)
        this.state={}
    }
    render(){
        return(
            <article>
                <PanoramaHeader/>
                <PanoramaMuodle/>
                <PanoramaFooter/>
                {/* <Logs/> */}
            </article>
        )
    }
    
}