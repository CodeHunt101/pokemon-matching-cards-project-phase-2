import React, { useEffect, useState } from "react";
import Card from './Card'
import shuffle from '../HelperFunctions'

export default function Deck() {
  const [pokemons, setPokemons] = useState([])
  const [isCardOpen, setIsCardOpen] = useState(new Array(30).fill(false))

  useEffect(()=> {
    const fetchPokemons = () => {
      const pokemonUrls = []
      const pokemonImages = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
        .then(resp => resp.json())
        .then(pokemons => {
          pokemons.results.forEach(pokemon => {
            pokemonUrls.push(pokemon.url)
          })
          return pokemonUrls.map(url=>
           fetch(url).then(resp=>resp.json()).then(pokemonUrl => pokemonUrl.sprites.other.dream_world.front_default)
          )
        })
      
      Promise.resolve(pokemonImages)
      .then((pokemonImages)=>Promise.all(pokemonImages)
        .then((pokemonImages)=>generatePokemons(pokemonImages)))
    }
   fetchPokemons()
  },[])


  const handleClick = (index) => {
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index]=true
    setIsCardOpen(copyOfIsCardOpen)
  }

  const generatePokemons = (pokemons) => {
    const array = shuffle(pokemons).map((pokemon,idx)=> idx<15 && pokemon)
    const cloneArray = shuffle([...array])
    const combinedArray = shuffle(array.concat(cloneArray).filter(pokemon=> pokemon))
    setPokemons(combinedArray)
  }

  const renderPokemons = () => {
    return pokemons.map((pokemon, idx) => <Card key={idx} index={idx} pokemon={pokemon} handleClick={handleClick} isCardOpen={isCardOpen[idx]}/>)
  }

  return (
    <ul className={'deck'}>
      {renderPokemons()}
    </ul>
  )
}