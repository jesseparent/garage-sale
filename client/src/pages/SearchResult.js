import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";

import { QUERY_ALL_PRODUCTS } from '../utils/queries';
import { QUERY_PRODUCTS } from '../utils/queries';

const searchResults(){

    const { id } = useParams();

    const { loading, data } = useQuery(QUERY_ALL_PRODUCTS, {
        variables: { _id: id },
    });

}

export default searchResults;