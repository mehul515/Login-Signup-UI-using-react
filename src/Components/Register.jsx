import React, { useState } from 'react'
import Navbar from './Navbar'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; 

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  })

  function handleFormChange(event) {
    setFormData((currData) => {
      currData[event.target.name] = event.target.value;
      return { ...currData };
    })
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    // console.log(formData);
    try {
      var response = await axios.post("http://localhost:8080/user/register", formData);
      // console.log(response);
      if(response.status === 200){
        await toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login")
        }, 1500);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message);
      };
      setFormData({
        name:"",
        email: "",
        password: "",
    })
  }


  return (
    <div>
    <Navbar></Navbar>
    <Toaster />
      <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className='mt-5'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className='mt-4'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className='mt-4'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="px-4 mt-4">
              Sign Up
            </Button>
            <div className='mt-3'>
                Already Have an Account?<Link to={"/login"}>Login Here</Link><br />
              </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Register