import React from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav-links">
          <li>
            <a href="/addproduct">Sell</a>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>Logout</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav-links">
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav className="navbar">
      <h1 className="page-title"><a href="/">Garage Sale</a></h1>
      <h3 className="title-description">Your one stop to buy and sell locally!</h3>
      {showNavigation()}
      <div className="burger">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
      </div>
    </nav>
  )
}
export default Nav;