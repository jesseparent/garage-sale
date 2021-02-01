import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import DetailBrief from "../components/DetailBrief";
import { useStoreContext } from "../utils/GlobalState.js";





const Home = () => {

  const [state] = useStoreContext();
  const { products } = state;

  const searchResults = () => {
    if (state.searchHappens) {
      return (
        <Container className="brief-container">
          <h2>Search Results</h2>
          <div className="featured-container">
            {products.map((product, i) =>
              <div className="featured-items">
                <DetailBrief num={i} />
              </div>
            )}
          </div>
        </Container>
      )
    }
    else {
      return (
        <Container className="brief-container">
          <h2>Featured Items</h2>
          <div className="featured-container">
            <div className="featured-items">
              <DetailBrief num={products.length - 1} />
            </div>
            <div className="featured-items">
              <DetailBrief num={products.length - 2} />
            </div>
            <div className="featured-items">
              <DetailBrief num={products.length - 3} />
            </div>
          </div>
        </Container>
      )
    }
  }

  useEffect(() => {
    console.log("Home test");
    console.log(products);
  }, [products]);

  return (
    <div className="mainContainer">
      <Container className="searchContainer">
        <SearchBar />
      </Container>
      {searchResults()}
    </div>
  );
};

export default Home;
