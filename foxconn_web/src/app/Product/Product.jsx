import React, { Component } from "react";
import "./Product.less";
import "./../../resource/styles/index.less";

import ProductDataStatistics from "./components/ProductDataStatistics/ProductDataStatistics"
import ProductDetectionLogs from "./components/ProductDetectionLogs/ProductDetectionLogs"
import ProductDeviceStatus from "./components/ProductDeviceStatus/ProductDeviceStatus"

// import client from "@/utils/WebsocketClient";
// import { msgType } from "@/utils/Config";

export default class Product extends Component {
  static displayName = "Product";
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {
    //   let getCheckInfo = JSON.parse(localStorage.getItem("data"));
    //   if (getCheckInfo == null) {
    //       this.props.history.push("/login");
    //   }
        return (
              <article>
                  <ProductDataStatistics/>
                  <ProductDeviceStatus/>
                  <ProductDetectionLogs/>
              </article>

        );
  }
}
