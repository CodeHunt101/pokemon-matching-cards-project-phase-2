import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
    fetch('http://localhost:4000/ratings')
      .then(resp => resp.json())
      .then(ratings => {
        setRatings(ratings.concat(ratings))
      })
      .catch(()=>alert("It seems like you're either using GitHub pages or have cloned this repo, but you haven't run json-server --watch  db.json -p 3001. New reviews won't be posted, and contact form submissions won't be stored in the mock JSON server database!\nHowever, you're still able to play the Pokemon Matching Cards!"))
  }

  useEffect(()=>{
    fetchRatings()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <Router>
      <Container>
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
      </Container>
    </Router>
  )
}