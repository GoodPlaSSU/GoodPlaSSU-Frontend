import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useGoolgeLogout} from 'react-google-login';

const MyPage = () => {
    const navigate = useNavigate();
    const onLogOutClick= () =>{
        //로그아웃 코드 작성 필요(DB연동이라 미작성)
        //setIsloggedIn(false)
        navigate("/"); //버튼 누를 시 루트 페이지로 돌아감
    };
    return (
        <>
        <h1>MyPage</h1>
        <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default MyPage;