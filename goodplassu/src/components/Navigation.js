import React from "react";
import {Link, useNavigate} from "react-router-dom"
import LogIn from "../routes/LogIn";


const Navigation = () =>{
    const navigate = useNavigate();
    const onLogInClick = () =>{
        navigate('/LogIn')
    }
    const onLogOutClick = () => {
        localStorage.removeItem('ID');
        localStorage.removeItem('Name');
    }
    return(
        <nav>
            <ul>
                <Link to="/"><button>선행게시판</button></Link>
                <Link to="/together"><button>참여게시판</button></Link>
                {(localStorage.getItem('ID')!=null) ? <Link to="/mypage"><button>마이페이지</button></Link> :
                <Link to="/LogIn"><button>마이페이지</button></Link>}
                {(localStorage.getItem('ID')!=null) ? <button onClick={onLogOutClick}>LogOut</button> :
                <button onClick={onLogInClick}>LogIn</button>}
            </ul>
        </nav>
    );
};

export default Navigation