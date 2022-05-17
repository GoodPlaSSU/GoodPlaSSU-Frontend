import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();
    const onLogOutClick= () =>{
        //로그아웃 코드 작성 필요(DB연동이라 미작성)
        navigate("/"); //버튼 누를 시 루트 페이지로 돌아감
    };
    return (
        <>
        <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default MyPage;