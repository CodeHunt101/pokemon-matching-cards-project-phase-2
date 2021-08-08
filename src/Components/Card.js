import React from "react";

export default function Card({pokemon, handleClick, index, isCardOpen}) {

  return (
    <button onClick={(e)=>handleClick(e,index)} className={'card'} disabled={isCardOpen} >
      <img className={isCardOpen ? 'open' : 'hidden'} src={pokemon} alt={pokemon}></img>
    </button>
  )
}
