import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Deck from './Components/Deck'

export default function App() {
  return (
    <Deck />
  )
}