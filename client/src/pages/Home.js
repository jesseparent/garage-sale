import React from 'react';
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";


const Home = () => {
  return (
    <div>
      <div class="search-container">
        <label for="searchInput" class="search">Search</label>
        <input type="text" class="search" name="TextBox" />
        <button class="general-search">Enter</button>
      </div>
      <div class="login-container">
        <label for="signup-new" class="new-member"
        >Not a member? Sign up here!</label
        >
        <button class="signup">Sign Up!</button>
      </div>
      <h2>Featured Items</h2>
      <div class="featured-container">
        <div class="featured-items">
          <img class="item-img" src="./img/baby-yoda.png" alt="baby-yoda" />
          <h4 class="item-brief-description">Item Brief Description</h4>
          <h4 class="model-info">Model info</h4>
          <button class="see-more">See More</button>
        </div>
        <div class="featured-items">Featured Item 2</div>
        <div class="featured-items">Featured Item 3</div>
      </div>
    </div>
  )
}

export default Home;