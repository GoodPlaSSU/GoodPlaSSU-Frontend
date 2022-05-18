import React, { useState } from 'react';
import { BrowserRouter as Router,
     Route, Routes, Navigate } from 'react-router-dom';
import Home from '../routes/Home';
import LogIn from '../routes/LogIn';
import MyPage from '../routes/myPage'
import Navigation from './Navigation';

const Routers = ({IsLoggedIn}) => {
    return (
        <Router>
            {IsLoggedIn &&<Navigation/>} 
            <Routes>
                { IsLoggedIn ? ( //로그인 되었다면 홈화면
                <>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/MyPage' element={<MyPage />}></Route>
                    
                </>
                ): ( //로그인 되어있지 않으면 로그인화면
                    <>
                <Route path = '/' element={<LogIn />}></Route>
                
                </>)
                }
            </Routes>
        </Router>
    )
}

export default Routers;