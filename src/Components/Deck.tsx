import React from "react"
import Card from "./Card"
import { Spinner } from "react-bootstrap"

type DeckProps = {
  pokemons: unknown[] | string[]
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number | ConcatArray<never>
  ) => void
  isCardOpen: boolean[]
  disableCardIndicator: number
}

export default function Deck({
  pokemons,
  handleClick,
  isCardOpen,
  disableCardIndicator,
}: DeckProps) {
  const renderCards = () =>
    pokemons.map((pokemon, idx) => (
      <Card
        key={idx}
        index={idx}
        pokemon={pokemon as string}
        handleClick={handleClick}
        isCardOpen={isCardOpen[idx]}
        disableCardIndicator={disableCardIndicator}
      />
    ))

  return (
    <div className={"deck"}>
      {renderCards().length === 0 && (
        <Spinner animation="border" variant="primary" />
      )}
      {renderCards()}
    </div>
  )
}
