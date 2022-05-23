import React from 'react';
import {useNavigate} from 'react-router-dom';

const MyPage = (IsLoggedIn) => {
    const navigate = useNavigate();

    return (
        <>
        <h1>
            마이페이지
        </h1>
        </>
    );
};

export default MyPage;