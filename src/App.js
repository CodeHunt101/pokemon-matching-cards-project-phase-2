import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GameManager from "./Components/GameManager";
import Header from "./Components/Header";
import Menu from "./Components/Menu";
import ReviewsContainer from "./Components/ReviewsContainer";
import Contact from "./Components/Contact";
import { 
  Switch, 
  BrowserRouter as Router, 
  Route } from "react-router-dom";
import initialReviews from "./InitialReviews";

export default function App() {
  const [reviews, setReviews] = useState(initialReviews)
  
  function fetchReviews() {
    // setReviews(initialReviews)
    fetch('http://localhost:4000/reviews')
      .then(resp => resp.json())
      .then(jsonReviews => {
        // const combinedReviews = jsonReviews
        setReviews(initialReviews.concat(jsonReviews))
      })
      .catch(()=>alert("It seems like you're either using GitHub pages or have cloned this repo, but you haven't run json-server --watch  db.json -p 3001. New reviews won't be posted, and contact form submissions won't be stored in the mock JSON server database!\nHowever, you're still able to play the Pokemon Matching Cards!"))
  }

  useEffect(()=>{
    fetchReviews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <Router>
      <Container>
            <Menu />
            <Header />
            <Switch>
              <Route exact path="/">
                <GameManager fetchReviews={fetchReviews}/>
              </Route>
              <Route exact path="/reviews">
                <ReviewsContainer reviews={reviews}/>
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
            </Switch>
      </Container>
    </Router>
  )
}