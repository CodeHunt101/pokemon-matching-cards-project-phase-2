import React from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'

export default function Contact() {
  return(
    <div className='contact-us'>
      <h1><b>Contact</b></h1>
      <div className='contact-info'>
        <div className='email'>
          <i className="fas fa-paper-plane fa-2x"></i>
          <span>haroldtm55@gmail.com</span>
        </div>
        <div className='phone'>
          <i className="fas fa-mobile-alt fa-2x"></i>
          <span>+61 401 927 123</span>
        </div>
      </div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter Surname" />
          </Form.Group>
        </Row>

        <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="textarea">
          <Form.Label>Your message:</Form.Label>
          <Form.Control required as="textarea" rows={3} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )

}