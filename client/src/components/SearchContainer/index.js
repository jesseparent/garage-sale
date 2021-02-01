import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import DetailBrief from "../DetailBrief";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../../utils/GlobalState";
import spinner from "../../assets/spinner.gif";
import { QUERY_PRODUCTS } from "../../utils/queries";
import SearchBrief from "../SearchBrief";

function SearchContainer() {
  const [searchBrief, setSearchBrief] = useState([]);

  // const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [state] = useStoreContext();
  const { products } = state;

  useEffect(()=> {
    console.log("state")
    console.log(state)
  },[state])

  return (
    <div>
      <h2>Search Happens!</h2>
      {state.products.length ? (
        <Container className="brief-container">
          <div className="featured-container">
            {products.map(product => (
              <div className="featured-items">
              <SearchBrief product={product}/>
              </div>
            ))}
          </div>
        </Container>
      ): (
        <h3>No Search results</h3>
      )}
    </div>
  )
}

export default SearchContainer;
