import React from 'react'

type CardProps = {
  pokemon: string
  index: number
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void
  isCardOpen: boolean
  disableCardIndicator: number
}

export default function Card({
  pokemon,
  handleClick,
  index,
  isCardOpen,
  disableCardIndicator,
}: CardProps) {
  return (
    <button
      onClick={(e) => handleClick(e, index)}
      disabled={disableCardIndicator === 2 || isCardOpen}
      className="card"
    >
      <img
        className={isCardOpen ? 'open' : 'hidden'}
        src={pokemon}
        alt={pokemon}
      ></img>
    </button>
  )
}
