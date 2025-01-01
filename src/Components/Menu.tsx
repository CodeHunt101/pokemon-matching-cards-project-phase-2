import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router"

export default function Menu() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="Navbar">
          <NavLink to="/">
            <i className="fas fa-gamepad fa-3x"></i>
          </NavLink>
          <NavLink to="/reviews">
            <b>Reviews</b>
          </NavLink>
          <NavLink to="/contact">
            <b>Contact</b>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}
