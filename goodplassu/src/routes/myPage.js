import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGoolgeLogout} from 'react-google-login';
import axios from 'axios';

const MyPage = () => {
    const [userInfo,setUserInfo] = useState({
            name:"", 
            portrait:"", 
            total_point: 0,
            month_point: 0
        });

    const id = localStorage.getItem("ID");

    useEffect(() => {
        axios.get(`https://goodplassu-server.herokuapp.com/mypage/user/${id}`)
        .then((res)=>{
            setUserInfo(res.data.user);
        })
        .catch((err)=>console.log(err))
    },[])


    // 게시물 버튼 클릭 함수 
    const navigate = useNavigate();
    const onPostClick = () => {
        navigate('/myPostList/post')
    }

    const onCommentClick = () => {
        navigate('/myPostList/comment')
    }

    const onCheerClick = () => {
        navigate('/myPostList/cheer')
    }
    //-----

    //선행로드맵
    const point = userInfo.total_point;


    return (
        // 마이페이지 레이아웃
        <>
        <h1>MyPage</h1>
        <img src={userInfo.portrait}/>
        <div>{userInfo.name}</div>
        <h4>선행 포인트 현황</h4>
        <div>전체 포인트: {userInfo.total_point}</div>
        <div>이달의 포인트: {userInfo.month_point}</div>
        <div><button onClick={onPostClick}>내가 쓴 게시물 보기</button></div>
        <div><button onClick={onCommentClick}>내가 댓글 쓴 게시물 보기</button></div>
        <div><button onClick={onCheerClick}>내가 좋아요 누른 게시물 보기</button></div>
        <> 
        <span>
        <p>선행 로드맵</p>
        </span>
        </>
        </>
    );
};

export default MyPage;