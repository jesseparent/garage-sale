import React from "react";
import { Container } from "react-bootstrap";
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
    </div>
  );
};

export default Home;
