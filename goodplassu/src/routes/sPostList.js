import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from "react-intersection-observer"
import axios from 'axios';
import styled from "styled-components";
import { Link, Navigate, useNavigate } from 'react-router-dom';

const SPostList = () => {

  	const[info,setinfo]=useState('');
    const [monthUserName,SetMonthUserName]=useState("minji"); // 이달의 선행왕
	const [maxpoint,SetMaxpoint]=useState(0);

  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])


    //이미지 업로드 함수
    const [imageLists,setImageLists] =useState([]);
    const handleAddImages = (event) =>{ //이미지 넣었을 때
        setImageLists(event.target.files);
        if (imageLists.length > 4) {
            setImageLists(imageLists.slice(0, 4));
        }
    };
    //

    //------ 게시글 작성 함수
    const [content, setContent] = useState(""); // 내용 입력할 때
    const onSubmit= (event) =>{
        event.preventDefault();
        {localStorage.getItem("ID") ?
        axios.post('https://goodplassu-server.herokuapp.com/board/',{
            "user_key" : localStorage.getItem("ID"),
            "content" : content,
            "image1" : imageLists[0],
            "image2" : imageLists[1],
            "image3" : imageLists[2],
            "image4" : imageLists[3],
            "tag" : 0
        })
        .then((res)=>{
            console.log(res);
            window.location.reload();
        })
        .catch((err)=>console.log(err))
        : navigate('/LogIn')}
    }
    const onChange= (event) =>{
        const{ target : { value }} = event;
        setContent(value);
    }
    
    //------

    // ------게시물 리스트 함수
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postLists, setPostLists] = useState([]);
    let pageNumber=1 // usestate로 변경하려고 했는데 이상하게 작동이 안돼서 그냥 변수로 선언
    const [endLoaded,setEndLoaded] = useState(false); // 로딩이 끝났는지 안끝났는지 확인하는 함수
    const firstloading=1; // 처음 로딩인지 아닌지 구분하기 위함
    const[lastcursor,SetLastCursor] =useState('');
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
                    SetLastCursor(res.data[9].post.cursor)
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
                    SetLastCursor(res.data[9].post.cursor)
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
    
    // 좋아요(참여하기) 클릭 함수
    const onCheerClick = (postid) =>{
        axios.post('https://goodplassu-server.herokuapp.com/cheer',{
            "user_key" : localStorage.getItem("ID"),
            "board_key" : postid,
            "isOn" : true
        })
    }
    //-----

    return (
        <div>
            <header>
            <h4>이달의 선행왕 : {monthUserName} point : {maxpoint}</h4>
            <form onSubmit={onSubmit}>
                <>
                <input value={content} onChange={onChange} type='text' placeholder='자신의 선행을 공유해보세요!' maxLength={1000} />
                <input type='file' name='imgFile' multiple='multiple' onChange={handleAddImages} accept='.jpg,.jpeg,.png'/>
                <input type='submit' value='POST' />
                </>
            </form>
            </header>
            <div className='cardcontainer'>
                {postLists.map((post,index)=>(
                    <span className='Post' key={index} >
                        <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)} >
                        <p>{index+1}</p>
                        <p>작성자 :{/*<img src={post.writer_portrait}></img>*/}{post.writer_name} </p>
                        <p>내용 : {post.content} </p>
                        <p>작성일자 : {moment(post.updated_at).format("YYYY-MM-DD HH:MM")} </p>
                        { (post.image1) ? <p> 📁 </p> : <p></p> } {/*이미지가 있으면 아이콘, 없으면 표시 x */}
                        </span>
                        <button onClick={()=>onCheerClick(`${post.id}`)} > 💓 {post.cheer_count}</button>
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