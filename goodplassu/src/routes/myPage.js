import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGoolgeLogout} from 'react-google-login';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const MyPage = () => {
    const [userInfo,setUserInfo] = useState([]);

    const id = localStorage.getItem("ID");

    useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])

    useEffect(() => {
        axios.get(`https://goodplassu-server.herokuapp.com/mypage/user/${id}`)
        .then((res)=>{
            setUserInfo(res.data.user[0]);
        })
        .catch((err)=>console.log(err))
    },[])

    useEffect(()=>{
        console.log(userInfo);
    },[userInfo])


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
        <Typography variant='h3' sx={{my: 3, fontWeight: 'bold'}}>MyPage</Typography>
        <Avatar sx={{mx: 'auto', width: 100, height: 100}} src={userInfo.portrait}/>
        <Box sx={{my: 3, py:2}}>
        <Typography sx={{fontWeight: 'bold'}} variant= 'h5'>{userInfo.name}</Typography>
        <Typography sx={{my: 1}} variant='h6'>선행 포인트 현황</Typography>
        <Typography sx={{}}>전체 포인트: {userInfo.total_point}</Typography>
        <Typography sx={{}}>이달의 포인트: {userInfo.month_point}</Typography>
        </Box>
        <List>
        <ListItem disablePadding>
            <ListItemButton onClick={onPostClick} width='300px'>
                <ListItemText primary="내가 쓴 게시물 보기"/>
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding>
            <ListItemButton onClick={onCommentClick}width='300px'>
            <ListItemText primary="내가 댓글 쓴 게시물 보기"/>
            </ListItemButton>
        </ListItem>
        <Divider/>
        <ListItem disablePadding>
            <ListItemButton onClick={onCheerClick}width='300px'>
            <ListItemText primary="내가 좋아요/참여하기 누른 게시물 보기"/>
            </ListItemButton>
        </ListItem>
        </List>
        <> 
        <span>
        <p>선행 로드맵</p>
        </span>
        </>
        </>
    );
};

export default MyPage;