import React from 'react';

const Nav = () => {
  return (
    <nav class="navbar">
      <h1 class="page-title"><a href="/">Garage Sale</a></h1>
      <h3 class="title-description">Your one stop to buy and sell locally!</h3>
      <ul class="nav-links">
        <li>
          <a href="#">Sell</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
      <div class="burger">
        <div class="line-1"></div>
        <div class="line-2"></div>
        <div class="line-3"></div>
      </div>
    </nav>
  )
}
export default Nav;