import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

import { useStoreContext } from "../utils/GlobalState.js";
import FeaturedItems from "../components/FeaturedItems";
import SearchResults from "./SearchResults";

const Home = () => {
  const [state] = useStoreContext();
  const { products } = state;

  function bottomSection() {
    if (!state.searchHappens) {
      return (
        <div>
          <FeaturedItems />
        </div>
      );
    } else {
      return (
        <div>
          
          <SearchResults />
        </div>
      );
    }
  }
  useEffect(() => {
    console.log("products");
    console.log(products);
  }, [products]);

  return (
    <div className="mainContainer">
      <Container className="searchContainer">
        <SearchBar />
      </Container>
      {bottomSection()}
    </div>
  );
};

export default Home;
