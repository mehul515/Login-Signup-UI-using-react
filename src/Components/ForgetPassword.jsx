import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
const ForgetPassword = () => {
  
  const [formData, setFormData] = useState({
    email: "",
  })

  function handleFormChange(event) {
    setFormData((currData) => {
      currData[event.target.name] = event.target.value;
      return { ...currData };
    })
  }

  async function handleFormSubmit(event) {
    const email = formData.email
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/forgetPassword" , {email});
      toast.success(response.data.message);
      // console.log(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    
    <Container className="mt-5">
      <Toaster />
        <Row className="justify-content-center">
          <Col md={4}>
            <h2 className="text-center mb-4">Forgot Password?</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formUsername" className='mt-5'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered Email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="px-4 mt-4">
                Send Email
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

export default ForgetPassword