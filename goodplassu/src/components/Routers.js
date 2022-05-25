import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CPostList from '../routes/cPostList';
import LogIn from '../routes/LogIn';
import MyPage from '../routes/myPage';
import SPostList from '../routes/sPostList'
import Navigation from './Navigation';

const Routers = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<SPostList />}></Route>
                <Route path='/together' element={<CPostList />}></Route>
                <Route path='/mypage' element={<MyPage/>}></Route>
                <Route path='/LogIn' element={<LogIn />}></Route>
            </Routes>
        </Router>
    )
}

export default Routers;