import axios from 'axios';
import React, { useEffect, useState } from'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MyPostList = () =>{
    const {no} = useParams();

    // ------게시물 리스트 함수
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postLists, setPostLists] = useState([]);
    let pageNumber=1 // usestate로 변경하려고 했는데 이상하게 작동이 안돼서 그냥 변수로 선언
    const [endLoaded,setEndLoaded] = useState(false); // 로딩이 끝났는지 안끝났는지 확인하는 함수
    let firstloading=1; // 처음 로딩인지 아닌지 구분하기 위함
    let lastcursor=null;
    const moment = require('moment'); // 시간 형식 바꿀 때 필요한 라이브러리

  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])
   
    const LoadPostList = async()=>{    
        setIsLoaded(true);
        console.log('loading')
        if(no==='post'){ // 내가 쓴 게시물을 눌렀을 때
            if(firstloading){
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mypost`,{params :{id:localStorage.getItem("ID"),cursor: '999999999999999999999999'}})
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result ===0) {setEndLoaded(true); setPostLists(null);}
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    } // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                    firstloading=0;
                })
            }
            else{
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mypost`,{params :{id:localStorage.getItem("ID"),cursor:lastcursor}}) // json-server에서 페이지 네이션 하는 법
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    }// 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                })
            }
        }
        else if (no==='comment'){ // 내가 댓글 단 게시물을 눌렀을 때
            if(firstloading){
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mycomment`,{params :{id:localStorage.getItem("ID"),cursor: '999999999999999999999999'}})
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result ===0) {setEndLoaded(true); setPostLists(null);}
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    }// 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                    firstloading=0;
                })
            }
            else{
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mycomment`,{params :{id:localStorage.getItem("ID"),cursor:lastcursor}}) // json-server에서 페이지 네이션 하는 법
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    }// 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                })
            }    
        }
        else if (no==='cheer'){ // 내가 좋아요 누른 게시물을 눌렀을 때
            if(firstloading){
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mycheer`,{params :{id:localStorage.getItem("ID"),cursor: '999999999999999999999999'}})
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result ===0) {setEndLoaded(true); setPostLists(null);}
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    }// 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                    firstloading=0;
                })
            }
            else{
                await axios.get(`https://goodplassu-server.herokuapp.com/mypage/mycheer`,{params :{id:localStorage.getItem("ID"),cursor:lastcursor}}) // json-server에서 페이지 네이션 하는 법
                .then((res) => {
                    console.log(res)
                    setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                    if(res.data.result !== 10) {
                        setEndLoaded(true);
                    }// 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                    else {
                        lastcursor=(res.data.post[9]).cursor
                    }
                    // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                })
            }
        }
        setIsLoaded(false);
    }   

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await LoadPostList(); 
            pageNumber++;
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        let observer;
        if (target) {
        observer = new IntersectionObserver(onIntersect, {
            rootMargin: '20px',
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

    return (
        <div>
            <div className='cardcontainer'>
            {postLists ? postLists.map((post,index)=>(
                <span className='Post' key={index} >
                    <Card sx={{mb: 2.5, mx: "auto",px: 5, py: 3, maxWidth: 500}}>
                    <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)} >
                    <CardHeader avatar={<Avatar src={post.wirter_portrait}/>}
                        title={post.writer_name}
                        subheader={moment(post.updated_at).format("YYYY-MM-DD HH:MM")}/>
                        <CardContent>
                            <Typography>
                                {post.writer_portrait}
                                {post.content}
                            </Typography>
                        </CardContent>
                    { (post.image1) ? <p> 📁 </p> : <p></p> } {/*이미지가 있으면 아이콘, 없으면 표시 x */}
                    </span>
                    <Typography>
                        {post.is_on? <FavoriteIcon color='error'/>:<FavoriteIcon color='disabled'/>} {post.cheer_count}  <PersonOutlineIcon sx={{ml: 2}}/> {post.view_count}
                    </Typography>
                    </Card>
                </span>
            )):<></>}
            </div>
            <> 
            {endLoaded ? <p> 마지막 게시물 입니다. </p>:<div ref={setTarget} className='Target Element'>{isLoaded &&"로딩중 .. 기다려주세요"}</div>}
            </>
        </div>
    )
}

export default MyPostList;