// src/components/Header.js
import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Header() {
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
    </Menu>
  );
}

export default Header;
