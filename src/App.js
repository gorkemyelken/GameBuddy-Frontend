// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MatchMaking from "./pages/MatchMaking";
import Header from "./components/Header";
import Login from "./pages/Login";    
import Register from "./pages/Register";
import UserList from './pages/UserList'; 
import UserSearchPage from "./pages/UserSearchPage";
import GameList from "./pages/GameList";

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
        <Route path="/userlist" element={<UserList />} />
        <Route path="/usersearch" element={<UserSearchPage />} />
        <Route path="/gamelist" element={<GameList />} />
      </Routes>
    </div>
  );
}

export default App;
