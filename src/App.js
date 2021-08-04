import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GameManager from "./Components/GameManager";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import RatingsContainer from "./Components/RatingsContainer";
import Contact from "./Components/Contact";
import { 
  Switch, 
  BrowserRouter as Router, 
  Route } from "react-router-dom";
import initialRatings from "./InitialRatings";

export default function App() {
  const [ratings, setRatings] = useState(initialRatings)
  
  function fetchRatings() {
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
                <GameManager fetchRatings={fetchRatings}/>
              </Route>
              <Route exact path="/ratings">
                <RatingsContainer ratings={ratings}/>
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}