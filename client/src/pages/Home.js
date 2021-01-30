import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

import { useStoreContext } from "../utils/GlobalState.js";
import FeaturedItems from "../components/FeaturedItems";
import SearchResults from "./SearchResults";

const Home = () => {
  const [state] = useStoreContext();
  const { products } = state;

  if (state.products.length === 0) {
    return (
<FeaturedItems />
    )
  }

  return (
    <div className="mainContainer">
      <Container className="searchContainer">
        <SearchBar />
      </Container>
      <Container className="featuredContainer">
        <FeaturedItems />
      </Container>
      <Container className="searchResultContainer">
        <SearchResults />
      </Container>
    </div>
  );
};

export default Home;
