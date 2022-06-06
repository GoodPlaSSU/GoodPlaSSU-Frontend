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
                "tag" : 0
            })
            .then((res)=>{
                console.log(res.data.id);
                if(image1!=null){
                    for (var key of formData.keys()) {
                        console.log(key);
                   }
                    axios.post(`https://goodplassu-server.herokuapp.com/board/image/${res.data.id}`,formData,
                    {headers: {"Content-Type" : "multipart/form-data"}})
                    .then((res)=>console.log(res))
                    .catch((err)=>console.log(err))
                }
                navigate('/')
            })
            .catch((err)=>console.log(err))
        }
        else if(no==='cpost'){
            axios.post(`https://goodplassu-server.herokuapp.com/board`,{
                "user_key" : localStorage.getItem("ID"),
                "content" : content,
                "image1" : image1,
                "image2" : image2,
                "image3" : image3,
                "image4" : image4,
                "tag" : 1
            })
            .then((res)=>{
                console.log(res);
                navigate('/cBoard')
            })
            .catch((err)=>console.log(err))
        }
        else{ //수정인 경우는 게시글 id가 넘어옴요..게시물 불러오기 함수
            axios.post(`https://goodplassu-server.herokuapp.com/board/${no}`,{
                "content" : content,
            })
            .then((res)=>{
                console.log(res);
                navigate(-1)
            })
            .catch((err)=>console.log(err))
            //-----
        }
    }

    useEffect(()=>{
        if(no==='cpost');
        else if(no==='spost');
        else{
            console.log(no)
            const postLoading = async() => {
                await axios.get(`https://goodplassu-server.herokuapp.com/board/${no}`)
                .then((res)=>{
                    setContent(res.data.post[0].content);
                    if(res.data.post[0].image1){}
                    if(res.data.post[0].user_key != localStorage.getItem("ID")){
                        alert('작성자가 아닌 사람은 수정할 수 없습니다.')
                        navigate('/LogIn')
                    }
                })
                .catch((err)=>console.log(err));
            }
            postLoading();
        }
    },[])
    
    // 이미지 업로드 함수
    const formData = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();
    let image1=null;
    let image2=null;
    let image3=null;
    let image4=null;
    const handleAddImages = (event) =>{ //이미지 넣었을 때
        if(event.target.files.length > 4 ){
            alert('이미지 업로드는 4개까지만 가능합니다.');
        }
        if(event.target.files){
            image1=event.target.files[0];
            formData.append('image1',event.target.files[0]);
            if(event.target.files[1]){
                formData.append('image2',event.target.files[1])
                if(event.target.files[2]){
                    formData.append('image3',event.target.files[2])                    
                    if(event.target.files[3]){
                        formData.append('image4',event.target.files[3])
                    }
                }
            }
        }
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
