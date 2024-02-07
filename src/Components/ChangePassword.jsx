import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
    const name = localStorage.getItem("name")
    // const token = localStorage.getItem("token")
    const {id, token} = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      newPassword: "",
      confirmPassword: "",
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
        // console.log(token);
        const response = await axios.post(`http://localhost:8080/user/forgetPassword/${id}/:${token}`, formData , {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        
        if(response.status === 200){
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login");
            localStorage.setItem("token",null)
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error.message)
      }
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    }

    async function handleLogout(){
      localStorage.removeItem("token")
      localStorage.removeItem("name")
      navigate("/login")
    }
  
    return (
      <div>
        <Navbar></Navbar>
        <Toaster />
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={4}>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formUsername" className='mt-5'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter New Password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
  
                <Form.Group controlId="formPassword" className='mt-4'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="px-3 mt-4 mx-3 ms-0">
                  Change Password
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
  )
}

export default ChangePassword