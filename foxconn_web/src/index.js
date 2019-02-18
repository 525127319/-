import React from "react";
import ReactDOM from "react-dom";
import {Route, HashRouter } from "react-router-dom";
import Energy from "./app/Energy/index.js";
import Product from "./app/Product/index.js";
import Smt from "./app/Smt/index.js";
import Panorama from './app/Panorama/index.js'
// import Login from "./app/Login/index.js";
 
ReactDOM.render(
  (<HashRouter>
    <div>
        <Route path="/" exact component={Energy} />
        <Route path="/product"   component={Product} />
        <Route path="/smt"   component={Smt} />
        <Route path="/panorama" component={Panorama}/>
        {/* <Route path="/login"   component={Login} /> */}
    </div>
  </HashRouter>),
  document.getElementById('root')
);
