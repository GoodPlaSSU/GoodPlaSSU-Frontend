import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../cssfiles/sPostView.css';

const SPostView = (boardID) => {
    const sPostTag=0;
    const cPostTag=1;
    const testUrl='testData/boardTest'
    var isCheerClicked=false; //디폴트 꺼진상태
    const [boardObject, setBoardObject] = useState( {
        id :1,
        name:"jhpyeon", 
            user_key:1,
            content:"hello", 
            image1:"",
            view_count:0,
            cheer_count:0,
            created_at:"2022-05-11",
            updated_at:"2022-05-11",
            tag: 0
    });
    //axios.get(testUrl);
    useEffect(()=>{
        // axios.get(`${testUrl}/${boardID}`,{id:boardObject.id},
        //     {tag: sPostTag}).then((response)=>{
        //         setBoardObject(response.data);
        //     })
    },[]);
    const onCheerClick=async()=>{
        console.log(isCheerClicked);
        // axios.post(`/api/board/cheer-count/remove/${boardID}`
        // ,{isOn: isCheerClicked, user_key:"", board_key:""})
        isCheerClicked = !isCheerClicked;
    }
    return (
        <div className='sPostView'>
            <span className='PostView'>
            <h3>{boardObject.name} {boardObject.created_at}</h3>
            <h4>{boardObject.content}</h4>
            <div>
                <img src={boardObject.image1}/>
                <img src={boardObject.image2}/>
                <img src={boardObject.image3}/>
                <img src={boardObject.image4}/>
            </div>
            <button className='CheerButton' onClick={onCheerClick}>좋아요</button>
            </span>
            <li></li>
        </div>
    );
};

export default SPostView;