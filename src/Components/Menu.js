import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'


export default function Menu() {
  return(
    <>
      <Navbar bg="primary" variant="dark">
      <Container>
      <Nav className="Navbar">
      <Nav.Link href="#home"><b>Home</b></Nav.Link>
        <Nav.Link href="#about"><b>About</b></Nav.Link>
        <Nav.Link href="#contact"><b>Contact Me</b></Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  </>
  )
}