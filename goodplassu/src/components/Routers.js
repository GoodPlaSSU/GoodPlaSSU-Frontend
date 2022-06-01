import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CPostList from '../routes/cPostList';
import LogIn from '../routes/LogIn';
import MyPage from '../routes/myPage';
import SPostList from '../routes/sPostList'
import Navigation from './Navigation';
import PostView from '../routes/PostView'
import MyPostList from '../routes/myPostList';

const Routers = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/' element={<SPostList />}></Route>
                <Route path='/cBoard' element={<CPostList />}></Route>
                <Route path='/mypage' element={<MyPage/>}></Route>
                <Route path='/LogIn' element={<LogIn />}></Route>
                <Route path='/PostView/:no' element={<PostView />}></Route>
                <Route path='/myPostList/:no' element={<MyPostList />}></Route>
            </Routes>
        </Router>
    )
}

export default Routers;