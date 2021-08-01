import React from "react";

export default function Card({pokemon, handleClick, index, isCardOpen, counter}) {

  return (
    <button onClick={(e)=>handleClick(e,index)} disabled={counter===2 || isCardOpen ? true : false} className={'card'}>
      <img className={isCardOpen ? 'open' : 'hidden'} src={pokemon} alt={pokemon}></img>
    </button>
  )
}

// (e)=>handleClick(e,index)