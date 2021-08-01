import React from 'react'

export default function GameStats({moves}) {
  return(
    <>
      <span><h5>Moves: {Math.floor(moves)}</h5></span>
    </>
    )
}