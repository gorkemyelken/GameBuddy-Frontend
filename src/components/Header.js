// src/components/Header.js
import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // useNavigate kullanımı

  const handleLogout = () => {
    // Kullanıcının oturumunu kapatmak için localStorage'dan kullanıcı verilerini sil
    localStorage.removeItem("user"); // Burada "user" yerine gerçek anahtarınızı kullanın
    navigate("/"); // Kullanıcıyı anasayfaya yönlendir
  };

  const user = JSON.parse(localStorage.getItem("user")); // Kullanıcının oturum açıp açmadığını kontrol et

  return (
    <Menu inverted>
      <Menu.Item as={Link} to="/" header>
        GameBuddy
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/profile">
        Profile
      </Menu.Item>
      <Menu.Item as={Link} to="/matchmaking">
        Matchmaking
      </Menu.Item>
      <Menu.Item position="right">
        {user ? (
          <button 
            onClick={handleLogout} 
            style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link> // Giriş yap butonu
        )}
      </Menu.Item>
    </Menu>
  );
}

export default Header;
