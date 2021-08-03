import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameManager from "./Components/GameManager";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import { 
  Switch, 
  BrowserRouter as Router, 
  Route } from "react-router-dom";
import RatingsContainer from "./Components/RatingsContainer";

export default function App() {
  const [ratings, setRatings] = useState([{
    id: 0,
    firstName: "Harold",
    lastName: "Torres",
    rating: 5,
    comments: "I like pokemons!",
    moves: 25
  }])
  
  function fetchRatings() {
    // const copyOfRatings = [...ratings]
    fetch('http://localhost:3001/results')
      .then(resp => resp.json())
      .then(results => {
        setRatings(ratings.concat(results))
      })
  }

  useEffect(()=>{
    fetchRatings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <Menu />
            <Header />
            <Switch>
              <Route exact path="/">
                <GameManager fetchRatings={fetchRatings} />
              </Route>
              <Route exact path="/about">
                <h1>ABOUT</h1>
              </Route>
              <Route exact path="/top-scores">
                <h1>TOP SCORERS</h1>
              </Route>
              <Route exact path="/ratings">
                <h1>RATINGS</h1>
                <RatingsContainer ratings={ratings}/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}