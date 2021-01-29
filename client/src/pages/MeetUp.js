import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCT } from "../utils/queries";
import { ADD_MEETING } from '../utils/mutations';
import { Form, Button, Container } from "react-bootstrap";


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

  const [addMeeting] = useMutation(ADD_MEETING);

  const { loading, data: productData } = useQuery(QUERY_PRODUCT, { variables: { _id: id } });

  const handleFormSubmit = async event => {
    event.preventDefault();
    const dateTime = formState.alertDate + ' ' + formState.alertTime;
    const mutationResponse = await addMeeting({
      variables: {
        product: productData?.product._id,
        address: formState.address,
        name: formState.name,
        phonenumber: formState.phonenumber,
        email: formState.email,
        seller: productData?.product.seller._id,
        alertDateTime: dateTime,
      }
    });

    if (mutationResponse) {

      window.location = '/';
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