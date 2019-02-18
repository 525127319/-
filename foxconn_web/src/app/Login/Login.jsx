import React, { Component } from "react";
import AxiosHttp from "@/utils/AxiosHttp";
// import {withRouter} from "react-router-dom";

export default class Login extends Component{
    static displayName = "Login";
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            unamehelp: "",
            upswhelp: "",
            isShowUnamehelp: false,
            isShowUpswhelp: false,
        }
    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value,
            isShowUnamehelp: false,
        })
    };
    changePassword = (e) => {
        this.setState({
            password: e.target.value,
            isShowUpswhelp: false,
        });
    };
    submitFun = () => {
        let {username, password} = this.state;
        if (!username) {
            this.setState({
                unamehelp: "用户名不能为空",
                isShowUnamehelp: true,
            });
        } else {
            this.setState({
                unamehelp: "",
                isShowUnamehelp: false,
            });
        }
        if (!password) {
            this.setState({
                upswhelp: "密码不能为空",
                isShowUpswhelp: true,
            });
        } else {
            this.setState({
                upswhelp: "",
                isShowUpswhelp: false,
            });
        }
        AxiosHttp
            .post('/user/logincheck', { username: username, password: password })
            .then(this.handle);
    };

    handle = (response) => {
        if (response.ok && response.value !== null) {
            // console.log(response);
            let data = JSON.stringify({
                "username": response.value.username,
                "password": response.value.password,
            });
            localStorage.setItem("data", data,);
            this.props.history.push("/");
        } else {
            this.setState({
                upswhelp: "用户名或密码错误",
                isShowUpswhelp: true,
            });
        }
    };


    render(){
        return(
            <article className="for-max">
                <div className="centre-main">
                    <div className="centre-main-form">
                        <p className="centre-main-form-top">登录</p>
                        <div className="centre-main-form-width">
                            <input
                                type="text"
                                name=""
                                placeholder="用户名"
                                value={this.state.username}
                                onChange={this.changeUsername}
                                className="text" />
                            <p>
                                {this.state.isShowUnamehelp && <span>{this.state.unamehelp}</span>}
                            </p>
                        </div>
                        <div className="centre-main-form-width">
                            <input
                                type="password"
                                placeholder="密码"
                                value={this.state.password}
                                onChange={this.changePassword}
                                className="password"/>
                            <p>
                                {this.state.isShowUpswhelp && <span>{this.state.upswhelp}</span>}
                            </p>
                        </div>
                        {/*<div className="centre-main-form-width">*/}
                            {/*<input type="" name="" placeholder="图片验证码" className="pt"/>*/}
                            {/*<div className="yz-bg"></div>*/}
                            {/*<p>*/}
                                 {/*<span style={{display:'none'}}>验证码不能为空</span>*/}
                            {/*</p>*/}
                        {/*</div>					*/}
                        <div className="centre-main-form-width">
                            <span className="sub" onClick={this.submitFun}>立即登录</span>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}