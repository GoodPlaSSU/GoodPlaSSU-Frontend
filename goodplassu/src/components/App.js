import '../App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from '../routes/Home';
import SPostList from '../routes/sPostList';
import Routers from './Routers';


function App() {
    const [IsLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('ID')!=null);
    useEffect(() => {(localStorage.getItem('ID')!=null)?setIsLoggedIn(true):setIsLoggedIn(false)
        },[localStorage.getItem('ID')])
        return (
        <div className="App">
            <Routers />
        </div>
    );
}

export default App;
