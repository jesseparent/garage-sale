import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_PRODUCT } from "../utils/mutations";

function AddProduct(props) {
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
        model: formState.model
      }
    });
    if (mutationResponse) {
      console.log('it worked! The returned data is the line below.')
      console.log(mutationResponse);
    }

  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="container my-1">
      {/* <Link to="/login">
        ← Go to Login
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
        <label for="category">Choose a category:</label>
        <select id="category" name="category" onChange={handleChange}>
          <option value="600d09e0c006b06e3817a3e7">tech</option>
          <option value="600d09e9c006b06e3817a3e8">art</option>
          <option value="600d09f7c006b06e3817a3e9">clothing</option>
        </select>
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
