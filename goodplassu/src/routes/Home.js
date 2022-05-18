import React, { useState , useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [content, setContent] = useState("");
    const onSubmit= (event) =>{
        event.preventDefault();
    }
    const onChange= (event) =>{
        const{ target : { value }} = event;
        setContent(value);
    }
    return (
        <div>
            <h1>home</h1>
            <form onSubmit={onSubmit}>
                <input value={content} onChange={onChange} type='text' placeholder='Contents' maxLength={500} />
                <input type='submit' value='post' />
            </form>
        </div>
    );
};

export default Home;