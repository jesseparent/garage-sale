import React, { useState, useEffect } from "react";

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATEGORIES } from '../utils/actions';
import { idbPromise } from '../utils/helpers';

import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_CATEGORIES } from "../utils/queries";

import { Form, Button, Container } from "react-bootstrap";


function AddProduct(props) {
  const [state, dispatch] = useStoreContext();

  // const { categories } = state;

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
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });

      // set default category on succesfull fetch of the category list
      setFormState({
        ...formState,
        category: categoryData.categories[0]._id
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
        model: formState.model
      }
    });
    if (mutationResponse) {

      props.history.push('/imageupload/' + mutationResponse.data.addProduct._id);
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

          {/* load categories and populate the category dropdown */}
          {state.categories.length ? (

            <Form.Group>
              <Form.Label>Choose a category:</Form.Label>
              <Form.Control
                as="select"
                id="category"
                name="category"
                onChange={handleChange}
              >

                {state.categories.map(category => (
                  <option value={category._id}>{category.name}</option>
                ))}

              </Form.Control>
            </Form.Group>
          ) : (
              <h3>There are no categories!!! This wont work without this.</h3>
            )}
          {loading ?
            <h3>loading...</h3> : null}

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
              placeholder="88"
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
          <Button variant="dark rounded-0" type="submit">
            Submit
           </Button>
        </Form>
      </Container>
    </div >
  );

}

export default AddProduct;