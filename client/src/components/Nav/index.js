import React from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Nav = () => {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul class="nav-links">
          <li>
            <a href="#">Sell</a>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>Logout</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="nav-links">
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
    <nav class="navbar">
      <h1 class="page-title"><a href="/">Garage Sale</a></h1>
      <h3 class="title-description">Your one stop to buy and sell locally!</h3>
      {showNavigation()}
      <div class="burger">
        <div class="line-1"></div>
        <div class="line-2"></div>
        <div class="line-3"></div>
      </div>
    </nav>
  )
}
export default Nav;