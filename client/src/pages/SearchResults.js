import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { useStoreContext } from "../utils/GlobalState";
import { idbPromise } from "../utils/helpers";
import { Card, Container } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { QUERY_SPECIFIC_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";
import { UPDATE_PRODUCTS } from "../utils/actions";
import FeaturedItems from "../components/FeaturedItems";
// import { idbPromise } from "../utils/helpers";

const SearchResults = () => {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentSearch, setCurrentSearch] = useState({
    searchResult: [],
  });
  const { loading, data } = useQuery(QUERY_SPECIFIC_PRODUCTS, {
    variables: { _id: id },
  });

  const { products } = state;
  console.log("State");
  console.log(state);
useEffect(()=> {
  let i = 0;
    console.log("products array")
    console.log(products[i]);

    if (state.products.length = 0){
      console.log("state and products");
      console.log(state.products)
      let i = 0;
      const targetResult = products[i];
      console.log("targetResult")
      console.log(targetResult)
       if(targetResult){
        setCurrentSearch({
          search: state.products[i]
        })
       }
       

      } 
    }, [products, state])
//   useEffect(() => {
//     console.log(data);

//     if (!loading && data && search.user) {
//       const targetResult = data.search;

//       console.log("targetResult");
//       console.log(targetResult);

//       setCurrentSearch({
//         _id: targetResult._id,
//         name: targetResult.name,
//         description: targetResult.description,
//         age: targetResult.age,
//         image: targetResult.image,
//         // sellerId: seller.targetResult._id,
//         // sellerFirstName: seller.targetResult.firstName,
//         // sellerLastName: seller.targetResult.lastName,
//         // categoryName: category.targetResult.name,
//       });
//       console.log("currentSearch");
//       console.log(currentSearch);
//     }
//   }, [data, loading, id, setCurrentSearch]);
  return (
    <>
      {currentSearch ? (
//       <div>

// {products.length > 0 &&
//   <h2>
//     You have {products.length} unread messages.
//   </h2>
// }
// </div>
        <div className="mainContainer">
{/* {state.products.length && state.products[1]} */}
          <h1>Please Render Here! </h1>
        
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
};

export default SearchResults;
