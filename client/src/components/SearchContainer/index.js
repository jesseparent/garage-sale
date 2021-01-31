import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import DetailBrief from "../DetailBrief";
import { useQuery } from "@apollo/react-hooks";
// import { useStoreContext } from "../../utils/GlobalState";
import spinner from "../../assets/spinner.gif";
import { QUERY_PRODUCTS } from "../../utils/queries";
import SearchBrief from "../SearchBrief";

function SearchContainer() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    console.log("data");
    console.log(data);
  }, [data]);

  return (
    <div className="mainContainer">
      {loading ? (
        <img src={spinner} alt="loading" />
      ) : (
        <Container className="brief-container">
          <h2>Search Happens</h2>
          <div className="featured-container">
            <div className="featured-items">
              <SearchBrief num={data.products.length - 1} />
            </div>
            <div className="featured-items">
              <SearchBrief num={data.products.length - 2} />
            </div>
            <div className="featured-items">
              <SearchBrief num={data.products.length - 3} />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default SearchContainer;
