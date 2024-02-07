import React, { useState } from 'react'
import Navbar from './Navbar'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    try {
      var response = await axios.post("http://localhost:8080/user/login", formData);
      // console.log(response.data, "   ",);
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("name", response.data.name)
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/home")
        }, 1000);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    // console.log(error);
    }
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div>
      <Navbar></Navbar>
      <Toaster />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={4}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formUsername" className='mt-5'>
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
                Login
              </Button><br />
              <div className='mt-3'>
                Forget Password?<Link to={"/resetPassword"}>Click Here</Link><br />
                Don't Have an Account?<Link to={"/register"}>Register Here</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login