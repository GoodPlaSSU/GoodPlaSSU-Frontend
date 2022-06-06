import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CPostList = () => {
    const[info,setinfo]=useState('');
    
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
        .catch((err)=>console.log(err))
    },[])
    //-----

    // 게시물 불러오기 함수
    const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postLists, setPostLists] = useState([]);
    let pageNumber=1 // usestate로 변경하려고 했는데 이상하게 작동이 안돼서 그냥 변수로 선언
    const [endLoaded,setEndLoaded] = useState(false); // 로딩이 끝났는지 안끝났는지 확인하는 함수
    let firstloading=1; // 처음 로딩인지 아닌지 구분하기 위함
    let lastcursor=null;
    const moment = require('moment'); // 시간 형식 바꿀 때 필요한 라이브러리
    let firstparameter = {params:{tag:1,cursor:'999999999999999999999999',user_key:localStorage.getItem("ID")}};
    let nextparameter = {params:{tag:1,cursor:lastcursor,user_key:localStorage.getItem("ID")}};


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
            rootMargin: '20px',
            threshold: 0.7,
        });
        observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target,endLoaded]);
    //------

    // 게시글 작성 버튼 함수
    const onPostingClick = () =>{
        {localStorage.getItem("ID") ? navigate('/posting/cpost') : navigate('/LogIn')}
    }
    //-----

    // 광고 불러오기 함수
    const [ads,setAds] = useState([]);
    let i = 0; // 광고 순서 매기기 위한 변수
    const adLoading = async() => {
        await axios.get(`https://goodplassu-server.herokuapp.com/ad`)
        .then((res)=>{
            setAds(res.data.ads);
            console.log(ads);
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        adLoading();
    },[])
    //-----

    // 카드(게시물) 클릭 함수
    const navigate = useNavigate();
    const CardClick = (postid) => {
        console.log(postid);
        navigate(`/PostView/${postid}`)
    }
    //-----

// 좋아요(참여하기) 클릭 함수
let cheerison = true;
const onCheerClick = async(postid) =>{
    if(localStorage.getItem("ID")==null){
        navigate('/LogIn'); // 로그인 되어있지 않으면 로그인 페이지로 이동
    }
    else{
        await axios.get(`https://goodplassu-server.herokuapp.com/cheer`,{params :{user_key:localStorage.getItem("ID"),board_key:postid}})
        .then((res)=>{
            cheerison=res.data.is_on
            console.log(cheerison)
        })
        .catch((err)=>console.log(err))
        {cheerison ?
        (await axios.post('https://goodplassu-server.herokuapp.com/cheer',{ // cheer가 1일때 실행 -> 눌러지지 않은 상태
            "user_key" : localStorage.getItem("ID"),
            "board_key" : postid,
            "isOn" : false
        })
        .then((res)=>{
            console.log('좋아요 취소')
            console.log(res);
        })) : (
            await axios.post('https://goodplassu-server.herokuapp.com/cheer',{
            "user_key" : localStorage.getItem("ID"),
            "board_key" : postid,
            "isOn" : true
        })
        .then((res)=>{
            console.log('좋아요')
            console.log(res);
        }))}}
    }
    //-----


    return (
        <div>
             <header>
            <p>이달의 선행왕 : {monthUserName.map((user,index)=>(<>{user.name}</>))} point : {maxpoint}</p>
            {/* <form onSubmit={onSubmit}>
                <>
                <input value={content} onChange={onChange} type='text' placeholder='같이 선행에 참여해보세요!' maxLength={1000} />
                <input type='file' name='imgFile' multiple='multiple' onChange={handleAddImages} accept='.jpg,.jpeg,.png' />
                <input type='submit' value='POST' />
                </>
            </form> */}
            <button onClick={onPostingClick}>게시글 작성하기!</button>
            </header>
            <div>
                {postLists.map((post,index)=>(
                    <span className='Post' key={index} >
                        <span className='Post-cheer' onClick={()=> CardClick(`${post.id}`)}>
                        <p>{index+1}</p>
                        <p>작성자 : {post.writer_name} </p>
                        <p>내용 : {post.content} </p>
                        <p>작성일자 : {moment(post.updated_at).format("YYYY-MM-DD HH:MM")} </p>
                        { (post.image1) ? <p> 📁 </p> : <p></p> } {/*이미지가 있으면 아이콘, 없으면 표시 x */}
                        </span>
                        <button> 참가하기 🙋🏻{post.cheer_count}
                        </button>
                        <p></p>
                        {index === 9 ? <a href={ads[i].link}><img src={ads[i++].image} /> </a> : <></>}
                    </span>
                ))  
                }
            </div>
            {ads.length - i ? (<a href={ads[i].link}><img src={ads[i++].image} /></a>) : <></>}
            <> 
            {endLoaded ? <p> 마지막 게시물 입니다. </p>  :
            <div ref={setTarget} className='Target Element'>{isLoaded &&"로딩중 .. 기다려주세요"}</div>}
            </>

        </div>
    );
};

export default CPostList;