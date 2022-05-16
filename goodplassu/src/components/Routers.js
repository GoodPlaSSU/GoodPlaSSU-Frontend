import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../routes/Home';
import LogIn from '../routes/LogIn';

const Routers = ({IsLoggedIn}) => {
    return (
        <Router>
            <Routes>
                { IsLoggedIn ?
                <Route path='/' element={<Home />}></Route>
                : <Route path = '/' element={<LogIn />}></Route>
                }
            </Routes>
        </Router>
    )
}

export default Routers;