import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SPostList = () => {
    const [data, setData] = useState('');
    useEffect = (() => {
        axios.get("http://jsonplaceholder.typicode.com/todos/1")
            .then(res=>setData(res.data))
    },[]);

    return (
        <div>
            {data}
        </div>
    );
};

export default SPostList;