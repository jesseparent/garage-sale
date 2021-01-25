import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { ADD_PRODUCT } from "../utils/mutations";
import { Form, Button, Container } from "react-bootstrap";

function AddProduct(props) {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const [formState, setFormState] = useState({
    category: "",
    name: "",
    description: "",
    price: 0,
    age: "",
    condition: "",
    model: "",
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleFormSubmit = async (event) => {
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
      },
    });
    if (mutationResponse) {
      console.log("it worked! The returned data is the line below.");
      console.log(mutationResponse);
      console.log(mutationResponse.data.addProduct._id)

      props.history.push('/imageupload/' + mutationResponse.data.addProduct._id);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="mainContainer">
      <Container>
        <h2>Item To Sell</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Item Name:</Form.Label>
            <Form.Control
              placeholder="Item to sell"
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose a category:</Form.Label>
            <Form.Control
              as="select"
              id="category"
              name="category"
              onChange={handleChange}
            >
              <option value="600d09e0c006b06e3817a3e7">Tech</option>
              <option value="600d09e9c006b06e3817a3e8">Art</option>
              <option value="600d09f7c006b06e3817a3e9">clothing</option>
              {/* <option>4</option> */}
              {/* <option>5</option> */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Made of stainless steel. Blocky. Cool."
              name="description"
              type="text"
              id="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price: </Form.Label>
            <Form.Control
              placeholder=""
              name="price"
              type="number"
              id="price"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Age: </Form.Label>
            <Form.Control
              placeholder="41 years"
              name="age"
              type="text"
              id="age"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Condition:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Good condition with minor wear"
              name="condition"
              type="text"
              id="condition"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Model:</Form.Label>
            <Form.Control
              placeholder="DMC-12"
              name="model"
              type="text"
              id="model"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Would You Like to Add a Picture?"
            />
          </Form.Group>
          <Button variant="dark rounded-0" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
    /* <Link to="/login">
        ← Go to Login
      </Link> */
  );
}

export default AddProduct;
