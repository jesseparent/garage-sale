import React from "react";
import { Container, Card } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import DetailBrief from "../components/DetailBrief";

const Home = () => {
  return (
    <div className="mainContainer">
      <Container className="searchContainer">
        <SearchBar />
      </Container>
      <Container>
        <h2>Featured Items</h2>
        <div className="featured-container">
          <div className="featured-items">
            <DetailBrief />
          </div>
          <div className="featured-items">
            <DetailBrief />
          </div>
          <div className="featured-items">
            <DetailBrief />
          </div>
        </div>
      </Container>

      {/* <div class="featured-items">
          <img class="item-img" src="./img/baby-yoda.png" alt="baby-yoda" />
          <h4 class="item-brief-description">Item Brief Description</h4>
          <h4 class="model-info">Model info</h4>
          <button class="see-more">See More</button>
        </div>
        <div class="featured-items">Featured Item 2</div>
        <div class="featured-items">Featured Item 3</div>
      </div> */}
    </div>
  );
};

export default Home;
