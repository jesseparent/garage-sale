import React from "react";
import { Container } from "react-bootstrap";
import DetailBrief from "../DetailBrief";
import { useStoreContext } from "../../utils/GlobalState";






function FeaturedItems() {


  const [ state ] = useStoreContext();
  const { products } = state;

  return (
    <div className="mainContainer">
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
    </div>
  );
}

export default FeaturedItems;
