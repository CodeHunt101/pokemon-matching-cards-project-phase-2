import React, { useState } from 'react'
import { Form, Row, Button, Col } from 'react-bootstrap'

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  })
  
  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:4000/contact',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: contactForm.firstName,
        lastName: contactForm.lastName,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message
      })
    })
    .then(()=>alert(`Thank you ${contactForm.firstName}, I will contact you soon!`))
    .catch(()=>alert(`Thank you ${contactForm.firstName}, I will contact you soon!`))
    setContactForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    })
  }

  function handleChange(e) {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }
  
  return(
    <div className='contact-us'>
      <h1><b>Contact</b></h1>
      <div className='contact-info'>
        <div className='email'>
          <i className="fas fa-paper-plane fa-2x"></i>
          <span><a href="mailto:haroldtm55@gmail.com">haroldtm55@gmail.com</a></span>
        </div>
        <div className='phone'>
          <i className="fas fa-mobile-alt fa-2x"></i>
          <span><a href="callto:+61404927123">+61 401 927 123</a></span>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" name="firstName" onChange={handleChange} value={contactForm.firstName}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter Surname" name="lastName" onChange={handleChange} value={contactForm.lastName}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" name="email"  onChange={handleChange} value={contactForm.email}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" name="phone"  onChange={handleChange} value={contactForm.phone}/>
          </Form.Group>
        </Row>
        
        <Form.Group as={Col} className="mb-3" controlId="textarea">
          <Form.Label>Your message:</Form.Label>
          <Form.Control required as="textarea" rows={3} name="message"  onChange={handleChange} value={contactForm.message}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )

}