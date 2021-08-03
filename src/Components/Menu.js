import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'


export default function Menu() {
  return(
    
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"><i className="fas fa-gamepad"></i></Navbar.Brand>
          <Nav className="Navbar">
            <Nav.Link href="/about"><b>About</b></Nav.Link>
            <Nav.Link href="/top-scores"><b>Top Scorers</b></Nav.Link>
            <Nav.Link href="/ratings"><b>Ratings</b></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
  )
}