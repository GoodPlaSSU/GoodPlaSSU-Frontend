import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

const Navigation = () =>{
    useEffect(()=>{},[])
    const navigate = useNavigate();
    const onLogInClick = () =>{
        navigate('/LogIn');
        window.location.reload();
    }
    const onLogOutClick = () => {
        window.localStorage.clear();
        navigate('/');
        }

    return(
        <nav>
            <ul>
                <Link to="/"><button>선행게시판</button></Link>
                <Link to="/cBoard"><button>참여게시판</button></Link>
                {(localStorage.getItem('ID')!=null) ? <Link to="/mypage"><button>마이페이지</button></Link> :
                <button onClick={onLogInClick}>마이페이지</button>}
                {(localStorage.getItem('ID')!=null) ? <button onClick={onLogOutClick}>LOGOUT</button> :
                <button onClick={onLogInClick}>LOGIN</button>}
            </ul>
        </nav>
    );
};

export default Navigation