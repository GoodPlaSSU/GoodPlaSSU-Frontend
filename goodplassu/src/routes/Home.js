import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SPostView from './sPostView';
import { useNavigate } from 'react-router-dom';

const Home = (userKeyInfo) => {
    userKeyInfo=1; //sample data
    //tag, cursor값 쿼리스트링으로 보낼것
    const boardTag=0; //tag=0 =>선행게시판
    const [content, setContent] = useState("");//글입력 설정용
    const [boards, setBoards] = useState([{
        id :1,
        name:"jhpyeon", 
        user_key:1,
        content:"hello goodplassu", 
        image:"",
        view_count:0,
        cheer_count:0,
        created_at:"2022-05-11",
        updated_at:"2022-05-11",
        tag: 0
    },
    {
        id :2,
        name:"mjkim", 
        user_key:2,
        content:"hello ssudo", 
        image:"",
        view_count:0,
        cheer_count:0,
        created_at:"2022-05-12",
        updated_at:"2022-05-12",
        tag: 0
    }]); //타임라인 배열
    const navigate= useNavigate();

    const onSubmit= (event) =>{
        console.log(content);
        event.preventDefault();
        //db전송코드
        axios.post('testData/boardTest.json',{
            //content
        })
    }
    const onChange= (event) =>{ //글입력시 변화 감지
        const{ target : { value }} = event;
        setContent(value);
        
    }
    const getBoards = async()=>{
        //const myboards = await axios.get('testData/boardTest.json');
        //db에서 게시글 받아옴
        //console.log(myboards.data.boards);
        //setBoards(myboards.data); //받은 배열 boards에 저장as
        // await axios.get('testData/boardTest.json').then(response=>{
        //     setBoards(response.data);
        // });
        console.log(boards);
    };
    const onBoardClick=async()=>{
        navigate("/PostView"); //글 클릭시 postview함수 페이지로 이동
        console.log("clicked ");
    }
    useEffect(()=>{
        getBoards();
        console.log(boards);
    },[]);
    return (
        //글 입력하고 전송하는 페이지 뷰.
        <div> 
            <h1>선행게시판</h1>
            <form onSubmit={onSubmit}> 
                <input value={content} onChange={onChange} type='text' placeholder='내용을 입력하세요' maxLength={500} /> 
                <input type='submit' value='post' /> 
                {/* 전송버튼 */}
            </form>
            <div>
                
                {/* 타임라인 표시 부분. map는 객체 늘어놓는함수*/}
                {boards.map((board) => (
                    <span key={board.id} onClick={onBoardClick}>
                        <h3>{board.name}</h3>
                    <h4>{board.content}</h4>
                    <h5>{board.image}</h5>
                    </span>
                ))}
                
                
            </div>
        </div>
    );
};

export default Home;