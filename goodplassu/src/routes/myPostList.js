import axios from 'axios';
import React, { useEffect, useState } from'react';
import { useNavigate, useParams } from 'react-router-dom';

const MyPostList = () =>{
    const {no} = useParams();

    // ------게시물 리스트 함수
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postLists, setPostLists] = useState([]);
    let pageNumber=1 // usestate로 변경하려고 했는데 이상하게 작동이 안돼서 그냥 변수로 선언
    const [endLoaded,setEndLoaded] = useState(false); // 로딩이 끝났는지 안끝났는지 확인하는 함수

    useEffect(() => {
        console.log(postLists);
    }, [postLists]);
    
    const getMorepost = async () => {
        setIsLoaded(true);
        console.log('loading')
        LoadPostList();
        setIsLoaded(false);
    };
   
    const LoadPostList = async()=>{    
        if(no==='post'){ // 내가 쓴 게시물을 눌렀을 때
            await axios.get(`http://localhost:5000/postlist?_page=${pageNumber}&_limit=10`) // json-server에서 페이지 네이션 하는 법
            .then((res) => {
                setPostLists(postLists=>postLists.concat(res.data)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.length%10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
            })
        }
        else if (no==='comment'){ // 내가 댓글 단 게시물을 눌렀을 때
            await axios.get(`http://localhost:5000/postlist?_page=${pageNumber}&_limit=10`) // json-server에서 페이지 네이션 하는 법
            .then((res) => {
                setPostLists(postLists=>postLists.concat(res.data)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.length%10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
            })        
        }
        else if (no==='cheer'){ // 내가 좋아요 누른 게시물을 눌렀을 때
            await axios.get(`http://localhost:5000/postlist?_page=${pageNumber}&_limit=10`) // json-server에서 페이지 네이션 하는 법
            .then((res) => {
                setPostLists(postLists=>postLists.concat(res.data)); // [...postLists,...res.data] 하면 이상하게 무한 get요청 하게됨
                if(res.data.length%10) setEndLoaded(true); // 받아온 데이터가 10개 이하면, endloaded를 true바꿈
                // endloaded가 true면 target이 변하지 않고, 로딩완료가 뜸
            })
        }
    }   

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

    return (
        <div>
            <div className='cardcontainer'>
            {postLists.map((post,index)=>(
                <span className='Post' key={index} >
                    <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)} >
                    <p>{index+1}</p>
                    <p>작성자 :{/*<img src={post.writer_portrait}></img>*/}{post.writer_name} </p>
                    <p>내용 : {post.content} </p>
                    { (post.image1) ? <p> 📁 </p> : <p></p> }
                    </span>
                    <button onClick={()=>console.log('하트')} > 💓 {post.cheer_count}</button>
                    <p></p>
                </span>
            ))}
            </div>
            <> 
            {endLoaded ? <p> 마지막 게시물 입니다. </p>  :
            <div ref={setTarget} className='Target Element'>{isLoaded &&"로딩중 .. 기다려주세요"}</div>}
            </>
        </div>
    )
}

export default MyPostList;