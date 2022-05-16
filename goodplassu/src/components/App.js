import '../App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import SPostList from '../routes/sPostList';
import Routers from './Routers';


function App() {
  const [IsLoggedIn, setIsLoggedIn ] = useState(true);
  return (
    <div className="App">
      <Routers IsLoggedIn={IsLoggedIn} />
    </div>
  );
}

export default App;
