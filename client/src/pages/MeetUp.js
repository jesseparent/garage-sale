import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Auth from "../utils/auth";

// import { useStoreContext } from "../utils/GlobalState";
// import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';
// import { idbPromise } from '../utils/helpers';

import { useMutation, useQuery } from '@apollo/react-hooks';
// import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_PRODUCT } from "../utils/queries";

import { Form, Button, Container } from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';


function MeetUp(props) {
  const { id } = useParams();

  const [formState, setFormState] = useState({
    address: '',
    name: '',
    phonenumber: '',
    email: '',
    alertDate: '',
    alertTime: '',
  });

  // const [addProduct] = useMutation(ADD_PRODUCT);

  const { loading, data: productData } = useQuery(QUERY_PRODUCT, { variables: { _id: id } });

  useEffect(() => {
    if (!loading) {
      console.log(productData.product)
    }
  }, [loading, productData])
  // useEffect(() => {

  //   // console.log(data)
  //   console.log(categoryData)



  //   if (categoryData) {
  //     dispatch({
  //       type: UPDATE_CATEGORIES,
  //       categories: categoryData.categories
  //     });
  //     categoryData.categories.forEach(category => {
  //       idbPromise('categories', 'put', category);
  //     });
  //   } else if (!loading) {
  //     idbPromise('categories', 'get').then(categories => {
  //       dispatch({
  //         type: UPDATE_CATEGORIES,
  //         categories: categories
  //       });
  //     });
  //   }
  // }, [categoryData, loading, dispatch]);

  const handleFormSubmit = async event => {
    event.preventDefault();
    //   const mutationResponse = await addProduct({
    //     variables: {
    //       category: formState.category,
    //       name: formState.name,
    //       description: formState.description,
    //       price: parseInt(formState.price),
    //       age: formState.age,
    //       condition: formState.condition,
    //       model: formState.model,
    //       // seller: context.user._id
    //     }
    //   });
    //   if (mutationResponse) {
    //     console.log('it worked! The returned data is the line below.')
    //     console.log(mutationResponse);
    //     console.log(mutationResponse.data.addProduct._id)

    //     props.history.push('/imageupload/' + mutationResponse.data.addProduct._id);
    //   }

  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
    console.log(formState);
  };

  return (
    <div className="mainContainer">
      <Container>
        <h2>Meeting Arranged</h2>
        <div className="font-weight-bold">
          Meeting with {productData?.product.seller.firstName} {productData?.product.seller.lastName} to purchase {productData?.product.name}
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group>
            <Form.Label>Address of Meeting:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Street, Apt, City, State, Zip"
              name="address"
              type="text"
              id="address"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Name:</Form.Label>
            <Form.Control
              placeholder="Contact Name"
              name="name"
              type="text"
              id="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Phone Number: </Form.Label>
            <Form.Control
              placeholder="Contact Phone Number"
              name="phonenumber"
              type="phonenumber"
              id="phonenumber"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Email: </Form.Label>
            <Form.Control
              placeholder="Contact Phone Number"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date to Send Alert By:</Form.Label>
            <Form.Control type="date" name="alertDate" id="alertDate" onChange={handleChange} onBlur={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time to Send Alert By:</Form.Label>
            <Form.Control type="time" name="alertTime" id="alertTime" onChange={handleChange} onBlur={handleChange} />
          </Form.Group>
          <Button variant="dark rounded-0" type="submit">
            Submit
           </Button>
        </Form>
      </Container>
    </div >
  );

}

export default MeetUp;