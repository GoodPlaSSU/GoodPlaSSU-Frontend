import React from "react";
import {Link, useNavigate} from "react-router-dom"
import LogIn from "../routes/LogIn";


const Navigation = (IsLoggedIn) =>{
    const navigate = useNavigate();
    const onButtonClick = () =>{
        navigate('/LogIn')
    }
    return(
        <nav>
            <ul>
                <Link to="/"><button>선행게시판</button></Link>
                <Link to="/together"><button>참여게시판</button></Link>
                {IsLoggedIn ?
                <Link to="/mypage"><button>마이페이지</button></Link> :
                <Link to="/LogIn"><button>마이페이지</button></Link>}
                {IsLoggedIn ? <button onClick={onButtonClick}>LogOut</button> :
                <button onClick={onButtonClick}>LogIn</button>}
            </ul>
        </nav>
    );
};

export default Navigation