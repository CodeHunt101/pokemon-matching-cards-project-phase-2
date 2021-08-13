import React from "react"

export default function Card({
  pokemon,
  handleClick,
  index,
  isCardOpen,
  disableCardIndicator,
}) {
  return (
    <button
      onClick={(e) => handleClick(e, index)}
      disabled={disableCardIndicator === 2 || isCardOpen}
      className="card"
    >
      <img
        className={isCardOpen ? "open" : "hidden"}
        src={pokemon}
        alt={pokemon}
      ></img>
    </button>
  )
}
