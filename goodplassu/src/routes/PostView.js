import { Card } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const PostView = () => {
    const { no } = useParams(); 
    const [ post, setPost ] = useState([]); // 게시물 상세보기
    const moment = require('moment'); // 시간 형식 바꿀 때 필요한 라이브러리
    const navigate = useNavigate();
    
  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])

    // 게시물 불러오기 함수
    const postLoading = async() => {
        console.log('postview loading');
        await axios.get(`https://goodplassu-server.herokuapp.com/board/${no}`)
        .then((res)=>{
            setPost(res.data.post[0]);
        })
        .catch((err)=>console.log(err));
    }

    useEffect(()=>{ // 게시글 불러오면 콘솔에 확인차 출력
        console.log(post)
    },[post])

    useEffect(() => { //처음에 게시글 불러오기 
        postLoading();
    }, []);
    //-----

    // 게시물 삭제 함수
    const deletePost = async() => {
        await axios.delete(`https://goodplassu-server.herokuapp.com/board/${no}`)
        .then((res)=>{
            console.log('post delete succeed!');
            navigate(-1);
        })
        .catch((err)=>console.log(err))
    }
    //-----

    // 댓글 불러오기 함수
    const [comments,setComments] = useState([]);
    const commentLoading = async() =>{
        await axios.get(`https://goodplassu-server.herokuapp.com/comment`, {params : {id : no}})
        .then((res)=>{
            setComments(res.data.comments);
            console.log(comments);
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        commentLoading();
    },[])
    //-----

    // 댓글 작성하기 함수
    const [commentcontent, setCommentContent] = useState(""); // 내용 입력할 때
    const onSubmit= (event) =>{
        event.preventDefault();
        if(localStorage.getItem("ID") == null){navigate('/LogIn'); window.location.reload();}
        axios.post(`https://goodplassu-server.herokuapp.com/comment`,{
            "user_key" : localStorage.getItem("ID"),
            "board_key" : no,
            "content" : commentcontent
        })
        .then((res)=>{
            console.log(res);
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }
    const onChange= (event) =>{
        const{ target : { value }} = event;
        setCommentContent(value);
    }
    //-----

    // 댓글 삭제하는 함수
    const deleteComment = async(commentid) =>{
        await axios.delete(`https://goodplassu-server.herokuapp.com/comment`,{params:{id:commentid}})
        .then((res)=>{
            console.log('comment delete succeed!');
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }
    //-----

    return (
        <div>
        <header> 
            <Card>
            <span><img src={post.writer_portrait} width='30px' height='30px'/> {post.writer_name} </span>
            <p>작성일자 : {moment(post.updated_at).format('YYYY-MM-DD HH:MM')}
            {post.user_key === localStorage.getItem("ID") ? <button onClick={()=>navigate(`/posting/${no}`)}>수정</button> :<></>}
            {post.user_key === localStorage.getItem("ID") ? <button onClick={deletePost}>삭제</button> : <></>}
            </p>
            <h3>{post.content}</h3>
            {post.image1 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>} {/*이미지가 존재하면 보여주고 아니면 안보여줌*/}
            {post.image2 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            {post.image3 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            {post.image4 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            <p>💓{post.cheer_count} </p>
            </Card>
        </header>
            {comments.map((comment,index)=>(
                <span className='comment' key={index} >
                <p>{comment.user_key} {moment(comment.created_at).format("YYYY-MM-DD HH:MM")}</p>
                <p>내용 : {comment.content} 
                {comment.user_key===localStorage.getItem("ID") ? <button onClick={()=>deleteComment(`${comment.id}`)}>삭제</button> : <></>}
                </p>
                </span>
            ))}
            <form onSubmit={onSubmit}>
                <>
                <input value={commentcontent} onChange={onChange} type='text' placeholder='댓글을 작성해보세요!' maxLength={600} />
                <input type='submit' value='작성' />
                </>
            </form>
        </div>
    )
};

export default PostView;