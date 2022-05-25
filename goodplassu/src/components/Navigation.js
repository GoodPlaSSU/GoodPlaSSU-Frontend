import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return(
    <header>
    <nav>
        <ul>
            <li>
                <Link to="/">선행게시판</Link>
            </li>
            <li>
                <Link to="/CPostList">참여게시판</Link>
            </li>
            <li>
                <Link to="/Mypage">Mypage</Link>
            </li>
        </ul>
    </nav>
    </header>
    );
};

export default Navigation;