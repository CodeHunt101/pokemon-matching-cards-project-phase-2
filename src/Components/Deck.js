import React from "react";
import Card from './Card'

export default function Deck({pokemons,handleClick,isCardOpen,disableCardIndicator}) {
  return (
    <ul className={'deck'}>
      {pokemons.map((pokemon, idx) => (
      <Card key={idx} 
            index={idx} 
            pokemon={pokemon} 
            handleClick={handleClick} 
            isCardOpen={isCardOpen[idx]} 
            disableCardIndicator={disableCardIndicator}/>))}
    </ul>
  )
}