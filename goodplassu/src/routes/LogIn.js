import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../layout/LogIn.css'

class LogIn extends Component {
    constructor() {
        super();
        this.state = { token: '' };
    }

    // #1 컴포넌트 마운트 직후 호출
    componentDidMount() {
        this.googleSDK();
    }
    // #4 로그인 기능 구현
    login = () => {
        this.auth2.signIn().then(googleUser => {
            let profile = googleUser.getBasicProfile();
            //console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            this.setState({ token: googleUser.getAuthResponse().id_token });
        });
        Navigate('/mypage');
    }

    // #5 로그아웃 기능 구현
    logout = () => {
        this.setState({ token: '' });
        this.auth2.disconnect();
    }

    googleSDK = () => {
        // #3 platform.js 스크립트 로드 후 gapi.auth2.init 함수 호출 및 로그인 버튼 기능 활성화
        window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                clientId: '964026109827-tjdfipg7dqa89aer49ljf0e8r1qhd085',
                plugin_name: "chat",
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
                });
            });
        }

        // #2 <script id="google-jssdk" src="https://.../platform.js?onload=googleSDKLoaded"></script> 태그를 문서에 추가
        //    스크립트 코드가 로드되면 googleSDKLoaded 호출
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2 className="text-left">GoodPlassu</h2>
                    <div className="card mt-3">
                        <div className="card-body">
                            <div className="row mt-5 mb-5">
                                <div className="col-md-4 mt-2 m-auto ">
                                    {this.state.token ?
                                        <button className="logoutBtn loginBtn--google" onClick={this.logout}>Logout</button> :
                                        <button className="loginBtn loginBtn--google" onClick={this.login} ref="">Login with Google</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;