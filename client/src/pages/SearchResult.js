// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/react-hooks";
// import { useStoreContext } from "../utils/GlobalState";
// import { idbPromise } from "../utils/helpers";
// import { Card, Container } from "react-bootstrap";
// import spinner from "../assets/spinner.gif";
// import SearchBar from "../components/SearchBar";
// import { QUERY_SPECIFIC_PRODUCTS } from "../utils/queries";
// import { UPDATE_PRODUCTS } from "../utils/actions";
// // import { idbPromise } from "../utils/helpers";

// const SearchResults = () => {
//   const [state, dispatch] = useStoreContext();
//   const { id } = useParams();

//   const [currentSearch, setCurrentSearch] = useState({
//     searchResult: [],
//   });
//   // const { loading, data } = useQuery(QUERY_SPECIFIC_PRODUCTS, {
//   //   variables: { _id: id },
//   // });

//   const { search } = state;

//   useEffect(() => {
//     console.log(search);

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
//   }, [data, loading, id, setCurrentSearch, state]);
//   return (
//     <>
//       {currentSearch ? (
//         <div className="mainContainer">
//           <Container fluid>
//             {currentSearch.search.map((targetResult) => (
//               <Card>
//                 <Card.Img variant="top" src={targetResult.image} />
//               </Card>
//             ))}
//           </Container>
//         </div>
//       ) : null}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//     </>
//   );
// };

// export default SearchResults;
