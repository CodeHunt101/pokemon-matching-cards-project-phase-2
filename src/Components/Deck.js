import React from "react";
import Card from './Card'
import { Spinner } from "react-bootstrap";

export default function Deck({pokemons,handleClick,isCardOpen}) {
  const renderCards = () => (
    pokemons.map((pokemon, idx) => (
      <Card key={idx} 
            index={idx} 
            pokemon={pokemon} 
            handleClick={handleClick} 
            isCardOpen={isCardOpen[idx]} 
            />))
  )
  return (
    <ul className={'deck'}>
      {renderCards().length===0 && <Spinner animation="border" variant="primary" />}
      {renderCards()}
    </ul>
  )
}
