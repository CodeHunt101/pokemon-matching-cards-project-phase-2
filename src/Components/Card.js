import React from "react";

export default function Card({pokemon, handleClick, index, isCardOpen}) {
  return (
    <li onClick={()=>handleClick(index)} className={'card'}>
      <img className={isCardOpen ? 'open' : 'hidden'} src={pokemon} alt={pokemon}></img>
    </li>
  )
}

