// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MatchMaking from "./pages/MatchMaking";
import Header from "./components/Header";
import Login from "./pages/Login";    
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matchmaking" element={<MatchMaking />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </div>
  );
}

export default App;
