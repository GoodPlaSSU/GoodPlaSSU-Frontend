import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [content, setContent] = useState("");
    const onSubmit= (event) =>{
        event.preventDefault();
        //전송코드
    }
    const onChange= (event) =>{ //글입력시 변화 감지
        const{ target : { value }} = event;
        setContent(value);
    }
    return (
        //글 입력하고 전송하는 페이지 뷰.
        <div> 
            <h1>home</h1>
            <form onSubmit={onSubmit}> 
                <input value={content} onChange={onChange} type='text' placeholder='내용을 입력하세요' maxLength={500} /> 
                <input type='submit' value='post' /> 
                {/* 전송버튼 */}
            </form>
        </div>
    );
};

export default Home;