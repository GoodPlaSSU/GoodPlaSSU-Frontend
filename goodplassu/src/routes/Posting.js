import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Posting = () =>{
    const navigate = useNavigate();
    const {no} = useParams();

  	useEffect(()=>{
        axios.defaults.withCredentials = true; 
    },[])

    const writepost = () => {
        if(no==='spost'){
            axios.post(`https://goodplassu-server.herokuapp.com/board`,{
                "user_key" : localStorage.getItem("ID"),
                "content" : content,
                "image1" : formData1,
                "image2" : formData2,
                "image3" : formData3,
                "image4" : formData4,
                "tag" : 0
            },{headers: {'Content-Type': 'multipart/form-data'}})
            .then((res)=>{
                console.log(res);
                navigate('/')
            })
            .catch((err)=>console.log(err))
        }
        else if(no==='cpost'){
            axios.post(`https://goodplassu-server.herokuapp.com/board`,{
                "user_key" : localStorage.getItem("ID"),
                "content" : content,
                "image1" : formData1,
                "image2" : formData2,
                "image3" : formData3,
                "image4" : formData4,
                "tag" : 1
            })
            .then((res)=>{
                console.log(res);
                navigate('/cBoard')
            })
            .catch((err)=>console.log(err))
        }
        else{ //수정인 경우는 게시글 id가 넘어옴요..
            // 게시물 불러오기 함수
            const postLoading = async() => {
                await axios.get(`https://goodplassu-server.herokuapp.com/board/${no}`)
                .then((res)=>{
                    setContent(res.data.post[0]);
                    if(res.data.post[0].user_key != localStorage.getItem("ID")){
                        alert('작성자가 아닌 사람은 수정할 수 없습니다.')
                        navigate('/LogIn')
                    }
                    console.log(no);
                })
                .catch((err)=>console.log(err));
            }
            postLoading();

            axios.post(`https://goodplassu-server.herokuapp.com/board/${no}`,{
                "content" : content,
                "image1" : formData1,
                "image2" : formData2,
                "image3" : formData3,
                "image4" : formData4,
            })
            .then((res)=>{
                console.log(res);
                navigate(-1)
            })
            .catch((err)=>console.log(err))
            //-----
        }
    }
    
    // 이미지 업로드 함수
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();
    const handleAddImages = (event) =>{ //이미지 넣었을 때
        if(event.target.files.length > 4 ){
            alert('이미지 업로드는 4개까지만 가능합니다.');
        }
        formData1.append('files',event.target.files[0])
        formData2.append('files',event.target.files[1])
        formData3.append('files',event.target.files[2])
        formData4.append('files',event.target.files[3])
    };
    //------

    //------ 게시글 작성 함수
    const [content, setContent] = useState(""); // 내용 입력할 때

    const onSubmit= (event) =>{
        event.preventDefault();
        {localStorage.getItem("ID") ? writepost()
        : navigate('/LogIn')}
    }

    const onChange= (event) =>{
        const{ target : { value }} = event;
        setContent(value);
    }
    //------

    return(
        <div>
            <form onSubmit={onSubmit}>
                <>
                <input value={content} onChange={onChange} type='text' placeholder='내용 입력' maxLength={1000} />
                <input type='file' name='imgFile' multiple='multiple' onChange={handleAddImages} accept='.jpg,.jpeg,.png'/>
                <input type='submit' value='POST' />
                </>
            </form>
        </div>
    )
}

export default Posting;
