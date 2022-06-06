
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from "react-intersection-observer"
import axios from 'axios';
import styled from "styled-components";
import { Link, Navigate, useNavigate } from 'react-router-dom';

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
    let firstparameter = {params:{tag:0,cursor:'999999999999999999999999',user_key:localStorage.getItem("ID")}};
    let nextparameter = {params:{tag:0,cursor:lastcursor,user_key:localStorage.getItem("ID")}};


    useEffect(() => {
        console.log(postLists);
    }, [postLists]);
    
    const getMorepost = async () => {
        setIsLoaded(true);
        console.log('loading')
        if(firstloading){
            await axios.get(`https://goodplassu-server.herokuapp.com/board`,firstparameter)
            .then((res) => {
                console.log(res)
                setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.result != 10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                else {
                    console.log((res.data.post[9]).cursor)
                    lastcursor=(res.data.post[9]).cursor
                    nextparameter = {params:{tag:0,cursor:lastcursor,user_key:localStorage.getItem("ID")}};
                }
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
                firstloading=0;
            })
        }
        else{
            await axios.get(`https://goodplassu-server.herokuapp.com/board`,nextparameter) // json-server에서 페이지 네이션 하는 법
            .then((res) => {
                console.log(nextparameter)
                console.log(res)
                setPostLists(postLists=>postLists.concat(res.data.post)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.result != 10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                else {
                    lastcursor=(res.data.post[9]).cursor
                    nextparameter = {params:{tag:0,cursor:lastcursor,user_key:localStorage.getItem("ID")}};
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

    return (
        <div>
            <header>
            <p>이달의 선행왕 : {monthUserName.map((user,index)=>(<>{user.name}</>))} point : {maxpoint}</p>
            <button onClick={onPostingClick}>게시글 작성하기!</button>
            </header>
            <div className='cardcontainer'>
                {postLists.map((post,index)=>(
                    <span className='Post' key={index} >
                        <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)} >
                        <p>{index+1}</p>
                        <p>작성자 :{/*<img src={post.writer_portrait}></img>*/}{post.writer_name} </p>
                        <p>내용 : {post.content} </p>
                        <p>작성일자 : {post.updated_at.substr(0,10) + ' ' + post.updated_at.slice(11,16)} </p>
                        { (post.image1) ? <p> 📁 </p> : <p></p> } {/*이미지가 있으면 아이콘, 없으면 표시 x */}
                        </span>
                        <span> {post.is_on ? '💖' : '🤍'} {post.cheer_count}</span>
                        <p></p>
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