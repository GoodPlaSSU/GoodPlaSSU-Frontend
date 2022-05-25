import '../App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import SPostList from '../routes/sPostList';
import Routers from './Routers';


function App() {
  const user = "jh"; //sample
  //console.log(user);
  const [init, setInit] = useState(false);
  const [IsLoggedIn, setIsLoggedIn ] = useState(false); //usestate 안에 현재 유저 정보 들어가기
  useEffect(()=>{
    if(user){
      setIsLoggedIn(true);
    }else{
      setInit(false);
    }
  },[]);
  return (
    <div className="App">
      
      <Routers IsLoggedIn={IsLoggedIn} />
      <footer>goodplassu</footer>
    </div>
  );
}

export default App;
