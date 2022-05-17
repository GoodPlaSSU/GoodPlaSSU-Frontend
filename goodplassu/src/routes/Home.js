import React, { useState } from 'react';

const Home = () => {
    const [content, setContent] = useState("");
    const onSubmit= (event) =>{
        event.preventDefault();
    }
    const onChange= (event) =>{ //글입력시
        const{ target : { value }} = event;
        setContent(value);
    }
    return (
        <div>
            <h1>home</h1>
            <form onSubmit={onSubmit}> 
                <input value={content} onChange={onChange} type='text' placeholder='Contents' maxLength={500} /> 
                <input type='submit' value='post' /> 
                {/* 전송버튼 */}
            </form>
        </div>
    );
};

export default Home;