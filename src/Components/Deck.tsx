import React from 'react'
import Card from './Card'
import { Spinner } from 'react-bootstrap'
import { Pokemon } from './GameManager'

type DeckProps = {
  pokemons: Pokemon[]
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
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
        key={`${pokemon.id}-${idx}`}
        index={idx}
        pokemon={pokemon.spriteUrl}
        handleClick={handleClick}
        isCardOpen={isCardOpen[idx]}
        disableCardIndicator={disableCardIndicator}
      />
    ))

  return (
    <div className={'deck'}>
      {renderCards().length === 0 && (
        <Spinner animation="border" variant="primary" />
      )}
      {renderCards()}
    </div>
  )
}
