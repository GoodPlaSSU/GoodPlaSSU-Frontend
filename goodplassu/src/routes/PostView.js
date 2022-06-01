import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostView = () => {
    const { no } = useParams(); // 왜인진 모르지만 no가 아닌 다른 이름은 오류가 남
    const [ post, setPost ] = useState([]); // 게시물 상세보기
    const moment = require('moment'); // 시간 형식 바꿀 때 필요한 라이브러리

    const postLoading = async() => {
        console.log('postview loading');
        await axios.get(`https://goodplassu-server.herokuapp.com/board/${no}`)
        .then((res)=>{
            setPost(res.data.post[0]);
        })
        .catch((err)=>console.log(err));
    }

    useEffect(()=>{
        console.log(post)
    },[post])

    useEffect(() => {
        postLoading();
    }, []);

    return (
        <header> 
            <span><img src={post.writer_portrait} width='30px' height='30px'/> {post.writer_name} </span>
            <p>작성일자 : {moment(post.updated_at).format('YYYY-MM-DD HH:MM')}</p>
            <h3>{post.content}</h3>
            {post.image1 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>} {/*이미지가 존재하면 보여주고 아니면 안보여줌*/}
            {post.image2 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            {post.image3 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            {post.image4 ? <img src={post.image1} width = 'auto' height='150px'/> :<p></p>}
            <p>💓 {post.cheer_count} </p>
        </header>
    )
};

export default PostView;