import React from "react"
import Card from "./Card"
import { Spinner } from "react-bootstrap"

export default function Deck({
  pokemons,
  handleClick,
  isCardOpen,
  disableCardIndicator,
}) {
  const renderCards = () =>
    pokemons.map((pokemon, idx) => (
      <Card
        key={idx}
        index={idx}
        pokemon={pokemon}
        handleClick={handleClick}
        isCardOpen={isCardOpen[idx]}
        disableCardIndicator={disableCardIndicator}
      />
    ))
  return (
    <ul className={"deck"}>
      {renderCards().length === 0 && (
        <Spinner animation="border" variant="primary" />
      )}
      {renderCards()}
    </ul>
  )
}
