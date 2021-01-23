import React from "react";
import "./style.css";

function ItemCard(props) {
  return (
    <div class="featured-container">
      <div class="featured-items">
        <img class="item-img" src={props.img} alt={props.name} />
        <div className="content">
          <ul>
            <li>
              <strong> Name:</strong> {props.name}
            </li>
            <li>
              <strong>Description: </strong> {props.description}
            </li>
            <li>
              <strong>Model:</strong> {props.model}
            </li>
            <li>
              <strong>Price</strong> {props.price}
            </li>
            <li>
              <strong>Quantity</strong> {props.quantity}
            </li>
            <li>
              <strong>Category</strong> {props.category}
            </li>
            <li>
              <strong>Age</strong> {props.age}
            </li>
            <li>
              <strong>Condition</strong> {props.condition}
            </li>
            <li>
              <strong>Seller</strong> {props.seller}
            </li>
            <li>
              <button class="see-more">See More</button>
            </li>
          </ul>
        </div>
      </div>
      <span onClick={() => props.seeMore(props.id)} className="see-more">
          See More
      </span>
    </div>
  );
}

export default ItemCard;
