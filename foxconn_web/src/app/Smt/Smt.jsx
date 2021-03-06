import React, { Component } from "react";
import "./Smt.less";
import "./../../resource/styles/index.less";

import SmtDataStatistics from "./components/SmtDataStatistics/SmtDataStatistics"
import SmtDetectionLogs from "./components/SmtDetectionLogs/SmtDetectionLogs"
import SmtDeviceStatus from "./components/SmtDeviceStatus/SmtDeviceStatus"

export default class Smt extends Component {
    static displayName = "Smt";
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        // let getCheckInfo = JSON.parse(localStorage.getItem("data"));
        // if (getCheckInfo == null) {
        //     this.props.history.push("/login");
        // }
        return (
            <article>
                <SmtDataStatistics/>
                <SmtDeviceStatus/>
                <SmtDetectionLogs/>
            </article>

        );
    }
}
