import React, { Component } from 'react';
import '../layout/LogIn.css'
import axios from 'axios';

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
            this.setState({ token: googleUser.getAuthResponse().id_token });
            let user = {
                id: profile.getEmail(),
                name:profile.getName(),
                portrait:profile.getImageUrl(),
            }
            axios.defaults.withCredentials = true; 
            axios.post(`https://goodplassu-backend.fly.dev/login`,user)
            .then((res)=>{
                console.log(res)
            })
            localStorage.setItem('ID',user["id"]);
            localStorage.setItem('Name',user["name"]);
            localStorage.setItem('Portrait',user["portrait"])
            window.history.go(-1)
        });
    }

    // #5 로그아웃 기능 구현
    logout = () => {
        this.setState({ token: '' });
        localStorage.removeItem('ID');
        localStorage.removeItem('Name')
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
                                        <button className="loginBtn loginBtn--google" onClick={this.login} ref="">Sign in With Google</button>
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