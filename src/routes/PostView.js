import { Card } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const PostView = () => {
    const { no } = useParams(); 
    const [ post, setPost ] = useState([]); // 게시물 상세보기
    const navigate = useNavigate();
    
  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])

    // 게시물 불러오기 함수
    const postLoading = async() => {
        console.log('postview loading');
        await axios.get(`https://goodplassu-backend.fly.dev/board/${no}`)
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
    }, [no]);
    //-----

    // 게시물 삭제 함수
    const deletePost = async() => {
        await axios.delete(`https://goodplassu-backend.fly.dev/board/${no}`)
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
        await axios.get(`https://goodplassu-backend.fly.dev/comment`, {params : {id : no}})
        .then((res)=>{
            console.log(res.data.comment)
            setComments(res.data.comment);
        })
        .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        commentLoading();
    },[no])
    //-----

    // 댓글 작성하기 함수
    const [commentcontent, setCommentContent] = useState(""); // 내용 입력할 때
    const onSubmit= (event) =>{
        event.preventDefault();
        if(localStorage.getItem("ID") == null){navigate('/LogIn'); window.location.reload();}
        axios.post(`https://goodplassu-backend.fly.dev/comment`,{
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
        await axios.delete(`https://goodplassu-backend.fly.dev/comment`,{params:{id:commentid}})
        .then((res)=>{
            console.log('comment delete succeed!');
            window.location.reload();
        })
        .catch((err)=>console.log(err))
    }
    //-----

    // 좋아요(참여하기) 클릭 함수
    const [ison,setIson]=useState();
    const [firstison,setFirstison]=useState(); // 처음에 눌러져있는지 안눌러져있는지 중요함..ㅠ
    useEffect(()=>{
        axios.get(`https://goodplassu-backend.fly.dev/cheer`,{params :{user_key:localStorage.getItem("ID"),board_key: no}})
        .then((res)=>{
            setIson(res.data.is_on)
            setFirstison(res.data.is_on)
        })
    },[no])

    const onCheerClick = () =>{
        if(localStorage.getItem("ID")==null){
            navigate('/LogIn'); // 로그인 되어있지 않으면 로그인 페이지로 이동
        }
        else{ison ?( //true -> 이미 눌러져 있음 
                    axios.post('https://goodplassu-backend.fly.dev/cheer',
                    {"user_key" : localStorage.getItem("ID"),
                    "board_key" : no,
                    "isOn" : false})
                    .then((res)=>{
                        console.log(res);
                        setIson(0);
                        console.log('좋아요 취소');
                    })) : (axios.post('https://goodplassu-backend.fly.dev/cheer',
                    {"user_key" : localStorage.getItem("ID"),
                    "board_key" : no,
                    "isOn" : true})
                    .then((res)=>{
                    console.log(res);
                    setIson(1);
                    console.log('좋아요');
                    }))
                }}
    //-----

    // 날짜 보여주기 함수
    const Date = (date) => {
        return date.substr(0,10) + ' ' + date.slice(11,16)
    }
    //-----

    return (
        <div>
        <header> 
            <Card sx={{mx: 'auto', maxWidth: 600, mb: 5, mt: 3}}>
            <CardHeader avatar={<Avatar sx={{ml: 5}} src={post.wirter_portrait}/>}
                        title={post.writer_name}
                        titleTypographyProps={{variant: 'h2', sx: {...{fontSize: 20}}}}
                        sx={{mt: 2}}
                        subheader={Date(String(post.updated_at))}/>
            <p>
            {post.user_key === localStorage.getItem("ID") ? <button onClick={()=>navigate(`/posting/${no}`)}>수정</button> :<></>}
            {post.user_key === localStorage.getItem("ID") ? <button onClick={deletePost}>삭제</button> : <></>}
            </p>
            <CardContent>
            <Typography sx={{mb: 2}}>{post.content}</Typography>
            {post.image1 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            {post.image2 ? <img src={post.image2} width = 'auto' height='150px'/> :<p></p>}
            {post.image3 ? <img src={post.image3} width = 'auto' height='150px'/> :<p></p>}
            {post.image4 ? <img src={post.image4} width = 'auto' height='150px'/> :<p></p>}
            <span onClick={onCheerClick}> {ison ? '💖' : '🤍'} {firstison ? (ison ? post.cheer_count : post.cheer_count-1) : (ison ? post.cheer_count+1 : post.cheer_count) } </span>
            </CardContent>
            </Card>
        </header>
        <Divider sx={{mb: 2}}/>
        <Typography sx={{my: 'auto', mb: 2, fontWeight: 'bold'}}>댓글</Typography>
            {comments? comments.map((comment,index)=>(
                <span className='comment' key={index} >
                <Card sx={{maxWidth: 600, mx: 'auto', mb: 0.5}}>
                <CardHeader avatar={<Avatar src={comment.writer_portrait}/>}
                        title={comment.writer_name}
                        titleTypographyProps={{variant: 'h2', sx: {...{fontSize: 15, fontWeight: "bold"}}}}
                        subheader={Date(String(comment.created_at))+' '}
                        subheaderTypographyProps={{sx: {...{fontSize: 12}}}}/>
                <p>{comment.content} 
                {comment.user_key===localStorage.getItem("ID") ? <button onClick={()=>deleteComment(`${comment.id}`)}>삭제</button> : <></>}
                </p>
                </Card>
                </span>
            )) : <></> }
            <form onSubmit={onSubmit}>
                <>
                <TextField sx={{width: 400}} multiline='true' variant='standard' value={commentcontent} onChange={onChange} placeholder='댓글을 작성해보세요!' maxLength={600} />
                <input type='submit' value='작성' />
                </>
            </form>
        </div>
    )
};

export default PostView;