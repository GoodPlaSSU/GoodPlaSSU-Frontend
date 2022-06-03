import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from "react-intersection-observer"
import axios from 'axios';
import styled from "styled-components";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const SPostList = () => {

  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])

    // 이달의 선행왕 함수
    const [monthUserName,setMonthUserName]=useState([]); // 이달의 선행왕
	const [maxpoint,setMaxpoint]=useState(0);
    useEffect(()=>{
        axios.get(`https://goodplassu-server.herokuapp.com/monthPoint`)
        .then((res)=>{
            console.log(res.data);
            setMaxpoint(res.data.maxPoint);
            setMonthUserName(res.data.monthUsers);
        })
        .catch((err)=>console.log('선행왕 오류'))
    },[])
    //-----

    // ------게시물 리스트 함수
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postLists, setPostLists] = useState([]);
    let pageNumber=1 // usestate로 변경하려고 했는데 이상하게 작동이 안돼서 그냥 변수로 선언
    const [endLoaded,setEndLoaded] = useState(false); // 로딩이 끝났는지 안끝났는지 확인하는 함수
    let firstloading=1; // 처음 로딩인지 아닌지 구분하기 위함
    let lastcursor = null;
    const moment = require('moment'); // 시간 형식 바꿀 때 필요한 라이브러리


    useEffect(() => {
        console.log(postLists);
    }, [postLists]);
    
    const getMorepost = async () => {
        setIsLoaded(true);
        console.log('loading')
        if(firstloading){
            await axios.get(`https://goodplassu-server.herokuapp.com/board`,{params :{tag:0,cursor: '999999999999999999999999'}})
            .then((res) => {
                console.log(res)
                setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.result != 10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                else {
                    console.log((res.data.post[9]).cursor)
                    lastcursor=(res.data.post[9]).cursor
                    console.log(lastcursor)
                }
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                firstloading=0;
            })
        }
        else{
            await axios.get(`https://goodplassu-server.herokuapp.com/board`,{params :{tag:0,cursor:lastcursor}}) // json-server에서 페이지 네이션 하는 법
            .then((res) => {
                console.log(res)
                setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.result != 10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                else {
                    lastcursor=(res.data.post[9]).cursor
                }
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
            })
        }
        setIsLoaded(false);
    };
    
    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await getMorepost(); 
            pageNumber++;
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        let observer;
        if (target) {
        observer = new IntersectionObserver(onIntersect, {
            rootMargin: '40px',
            threshold: 0.7,
        });
        observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target,endLoaded]);
    //------

    // 카드(게시물) 클릭 함수
    const navigate = useNavigate();
    const CardClick = (postid) => {
        console.log(postid);
        navigate(`/PostView/${postid}`)
    }
    //-----

    // 게시글 작성 버튼 함수
    const onPostingClick = () =>{
        {localStorage.getItem("ID") ? navigate('/posting/spost') : navigate('/LogIn')}
    }
    //-----
    
    // 좋아요(참여하기) 클릭 함수
    const [cheer,setCheer]=useState(1); // 1이면 아직 누르지 않은 상태, 0이면 누른 상태
    const onCheerClick = (postid) =>{
        if(localStorage.getItem("ID")==null){
            navigate('LogIn'); // 로그인 되어있지 않으면 로그인 페이지로 이동
        }
        else{
        {cheer ?
        (axios.post('https://goodplassu-server.herokuapp.com/cheer',{ // cheer가 1일때 실행 -> 눌러지지 않은 상태
            "user_key" : localStorage.getItem("ID"),
            "board_key" : postid,
            "isOn" : true
        })
        .then((res)=>{
            console.log(res);
            setCheer(0);
        })) : (
            axios.post('https://goodplassu-server.herokuapp.com/cheer',{
            "user_key" : localStorage.getItem("ID"),
            "board_key" : postid,
            "isOn" : false
        })
        .then((res)=>{
            console.log(res);
            setCheer(1);
        }))}}
    }
    //-----

    return (
        <div>
            <header>
            <Box>
                <p>이달의 선행왕 : {monthUserName.map((user,index)=>(<>{user.name}</>))} point : {maxpoint}</p>
            </Box>
            <button onClick={onPostingClick}>게시글 작성하기!</button>
            </header>
            <div className='cardcontainer'>
                {postLists.map((post,index)=>(
                    <span className='Post' key={index} >
                        <Card sx={{my: 2, mx:5,px:5, py:3}}>
                        <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)} >
                        <CardHeader avatat={<Avatar src={post.writer_portrait}/>}
                        title={post.writer_name}
                        subheader={moment(post.updated_at).format("YYYY-MM-DD HH:MM")}/>
                        {/* <p>작성자 :<img src={post.writer_portrait}></img>{post.writer_name} </p> */}
                        <CardContent>
                            <Typography>
                                {post.content}
                            </Typography>
                        </CardContent>
                        {/* <CardMedia componet="img"/> */}
                        { (post.image1) ? <p> 📁 </p> : <p></p> } {/*이미지가 있으면 아이콘, 없으면 표시 x */}
                        </span>
                        <button onClick={()=>onCheerClick(`${post.id}`)} > 💓 {cheer ? post.cheer_count : post.cheer_count + 1 }
                        </button>
                        <p></p>
                        </Card>
                    </span>
                ))}
            </div>
            <> 
            {endLoaded ? <p> 마지막 게시물 입니다. </p>  :
            <div ref={setTarget} className='Target Element'>{isLoaded &&"로딩중 .. 기다려주세요"}</div>}
            </>
        </div>
    );
};

export default SPostList;