import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import Navbar from '../components/Navbar';
import Home from "../pages/Home"
// import Home2 from "../pages/Home2"
// import Home3 from "../pages/Home3"

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router