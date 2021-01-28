import React from "react";
import image from "../assets/dead-end.jpg";

const NoMatch = () => {
  return (
    <div className="mainContainer">
      <div className="errorPage">
        <h1>404 Page Not Found</h1>
      </div>
      <div>
        <img className="errorImg" src={image}></img>
      </div>
    </div>
  );
};

export default NoMatch;
