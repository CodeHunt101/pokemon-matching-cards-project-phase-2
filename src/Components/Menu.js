import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="Navbar">
          <Link to="/">
            <i className="fas fa-gamepad fa-3x"></i>
          </Link>
          <Link to="/reviews">
            <b>Reviews</b>
          </Link>
          <Link to="/contact">
            <b>Contact</b>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
