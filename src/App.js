import React from "react";
import GameManager from "./Components/GameManager";
import Menu from "./Components/Menu";
import { Header, Container } from 'semantic-ui-react'

export default function App() {
  return (
    <Container>
      <Header as='h3'>Pokemon Memory Cards Game</Header>
      <GameManager />
      <Menu />
    </Container>
  )
}