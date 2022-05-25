import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGoolgeLogout} from 'react-google-login';
import axios from 'axios';

const MyPage = () => {
    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState({
            id :1,
            name:"jhpyeon", 
            portrait:"", 
            total_point:100,
            month_point:10
        });
    const onLogOutClick= () =>{
        //로그아웃 코드 작성 필요(DB연동이라 미작성)
        navigate("/"); //버튼 누를 시 루트 페이지로 돌아감
    };
    const getUserInfo=async()=>{
        setUserInfo(await axios.get(`testData/userTest.json`));
    }
    useEffect( ()=>{getUserInfo();},[])
    return (
        // 마이페이지 레이아웃
        <>
        <h1>MyPage</h1>
        <img src={userInfo.portrait}/>
        <div>{userInfo.name}</div>
        <h4>선행 포인트 현황</h4>
        <div>전체 포인트: {userInfo.total_point}</div>
        <div>이달의 포인트: {userInfo.month_point}</div>
        <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default MyPage;