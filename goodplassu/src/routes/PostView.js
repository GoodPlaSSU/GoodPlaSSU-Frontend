import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostView = () => {
    const { no } = useParams(); // 왜인진 모르지만 no가 아닌 다른 이름은 오류가 남
    const [ data, setData ] = useState({
        "id" : 0, // 값이 없을 때 id를 숫자로 했으면 0 아니면 ''로 표현
        "user_key": "",
        "writer_name": "",
        "writer_portrait":"",
        "content": "",
        "image1":"",
        "image2":"",
        "image3":"",
        "image4":"",
        "cheer_count": '' 
    });
  
    useEffect(() => {
        console.log('postview loading');
        axios.get(`http://localhost:5000/postlist/${no}`)
        .then((res)=>{
            setData(res.data)
            console.log(data)
        })
        .catch((err)=>console.log(err));
    }, []);

    return (
        <div>
            <p>작성자 : {data.writer_name}</p>
            <p>작성일자 : {'2022.06.13'}</p>
            <h3>{data.content}</h3>
            <p>💓 {data.cheer_count} </p>
        </div>
    )
};

export default PostView;