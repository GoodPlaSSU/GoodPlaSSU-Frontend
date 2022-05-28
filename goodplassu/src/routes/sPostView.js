import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SPostView = (boardID) => {
    const sPostTag=0;
    const cPostTag=1;
    const testUrl='testData/boardTest'
    const isCheerClicked=false;
    const [boardObject, setBoardObject] = useState( {
        id : "",
        name : "",
        user_key : "",
        content : "",
        image1: "", image2: "", image3: "", image4: "",
        view_count : "",
        cheer_count : "",
        created_at : "",
        updated_At : "",
        tag : 0,
    });
    axios.get("",{params:{id : boardID}});
    axios.get({
        params:{id:boardObject.id}
    });
    setBoardObject(

    );
    const onCheerClick=async()=>{
        axios.patch("",{isOn: isCheerClicked, user_key:"", board_key:""})
        isCheerClicked = !isCheerClicked;
    }
    return (
        <dlv>
            {boardObject.name} {boardObject.created_at}
            {boardObject.content}
            <div>
                <img src={boardObject.image1}/>
                <img src={boardObject.image2}/>
                <img src={boardObject.image3}/>
                <img src={boardObject.image4}/>
            </div>
            <button onClick={onCheerClick}>좋아요</button>
        </dlv>
        
    );
};

export default SPostView;