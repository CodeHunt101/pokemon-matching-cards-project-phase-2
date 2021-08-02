import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameManager from "./Components/GameManager";
import Header from "./Components/Header";
import Menu from "./Components/Menu";

export default function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Menu />
          <Header />
          <GameManager />
        </Col>
      </Row>
    </Container>
  )
}