import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_CATEGORIES } from "../utils/queries";


function AddProduct(props) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const [formState, setFormState] = useState({
    category: '',
    name: '',
    description: '',
    price: 0,
    age: '',
    condition: '',
    model: '',
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {

    // console.log(data)
    console.log(categoryData)



    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addProduct({
      variables: {
        category: formState.category,
        name: formState.name,
        description: formState.description,
        price: parseInt(formState.price),
        age: formState.age,
        condition: formState.condition,
        model: formState.model,
        // seller: context.user._id
      }
    });
    if (mutationResponse) {
      console.log('it worked! The returned data is the line below.')
      console.log(mutationResponse);
      console.log(mutationResponse.data.addProduct._id)

      props.history.push('/imageupload/' + mutationResponse.data.addProduct._id);
    }

  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
    // console.log(formState);
  };

  return (
    <div className="container my-1">
      {/* <Link to="/">
        ← Go to Home
      </Link> */}

      <h2>Item To Sell</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Item Name:</label>
          <input
            placeholder="Item to sell"
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>

        {/* load categories and populate the category dropdown */}
      {state.categories.length ? (
        <div>
          <label for="category">Choose a category:</label>
          <select id="category" name="category" onChange={handleChange}>
              
                {state.categories.map(category => (
                  <option value={category._id}>{category.name}</option>
                ))}
            
            </select>
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <h3>loading...</h3>: null}

        <div className="flex-row space-between my-2">
          <label htmlFor="description">Description:</label>
          <input
            placeholder="Made of stainless steel. Blocky. Cool."
            name="description"
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">Price:</label>
          <input
            placeholder="88"
            name="price"
            type="number"
            id="price"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="age">Age:</label>
          <input
            placeholder="41 years"
            name="age"
            type="text"
            id="age"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="condition">Condition:</label>
          <input
            placeholder="Good condition with minor wear"
            name="condition"
            type="text"
            id="condition"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="model">Model:</label>
          <input
            placeholder="DMC-12"
            name="model"
            type="text"
            id="model"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

}

export default AddProduct;
