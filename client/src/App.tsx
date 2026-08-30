// import React from 'react'
import NavBar from "../public/components/Navbar/NavBar.tsx";
import Home from "../public/components/Home/Home.tsx";
import Chatting from "../public/components/Chatting/Chatting.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
