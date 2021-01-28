import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import DetailBrief from "../components/DetailBrief";
import { useStoreContext } from "../utils/GlobalState.js";





const Home = () => {

  const [ state ] = useStoreContext();
  const { products } = state;

  return (
    <div className="mainContainer">
      <Container className="searchContainer">
        <SearchBar />
      </Container>
      <Container className="brief-container">
        <h2>Featured Items</h2>
        <div className="featured-container">
          <div className="featured-items">
            <DetailBrief num={products.length - 1 }/>
          </div>
          <div className="featured-items">
            <DetailBrief num={products.length - 2}/>
          </div>
          <div className="featured-items">
            <DetailBrief num={products.length - 3}/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
