import '../App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import SPostList from '../routes/sPostList';
import Routers from './Routers';
import axios from 'axios';


function App() {
        return (
        <div className="App">
            <Routers />
        </div>
    );
}

export default App;
