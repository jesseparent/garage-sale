import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";


import { Card, Container } from "react-bootstrap";
import DetailBrief from "../components/DetailBrief";

function searchResults() {
  return (
    <div className="mainContainer">
      <Container>
        <DetailBrief />
      </Container>
    </div>
  );
}

export default searchResults;
