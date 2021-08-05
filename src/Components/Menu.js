import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Menu() {
  return(
    
      <Navbar bg="primary" variant="dark">
        <Container>
          {/* <Navbar.Brand href="/"><i className="fas fa-gamepad fa-2x"></i></Navbar.Brand> */}
          <Nav className="Navbar">
            {/* <Nav.Link href="/about"><b>About</b></Nav.Link>
            <Nav.Link href="/reviews"><b>Reviews</b></Nav.Link> */}
            <Link to="/"><i className="fas fa-gamepad fa-3x"></i></Link>
            <Link to="/reviews"><b>Reviews</b></Link>
            <Link to="/contact"><b>Contact</b></Link>
          </Nav>
        </Container>
      </Navbar>
    
  )
}