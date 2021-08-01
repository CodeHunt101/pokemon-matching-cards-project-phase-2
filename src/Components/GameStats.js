import React from 'react'

export default function GameStats({moves}) {
  return(
    <>
      <span>Moves: {Math.floor(moves)}</span>
    </>
    )
}