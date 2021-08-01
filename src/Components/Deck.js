import React, { useEffect, useState } from "react";
import Card from './Card'
import shuffle, {getPokemonIdFromImgUrl} from '../HelperFunctions'

export default function Deck() {
  const [pokemons, setPokemons] = useState([])
  function generatePokemons(pokemons) {
    const array = shuffle(pokemons).map((pokemon,idx)=> idx<10 && pokemon)
    const cloneArray = shuffle([...array])
    const combinedArray = shuffle(array.concat(cloneArray).filter(pokemon=> pokemon))
    setPokemons(combinedArray)
  }
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
  
  const [isCardOpen, setIsCardOpen] = useState(new Array(20).fill(false))
  const [pair, setPair] = useState([])
  const [counter, setCounter] = useState(0)
  function handleClick (e,index) {
    setCounter(counter + 1)
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index]=true
    setIsCardOpen(copyOfIsCardOpen)
    const copyOfPair = [...pair]
    setPair(copyOfPair.concat(index))
    appendClickedCard(e)
    
  }
  const [matchingPairs, setMatchingPairs] = useState([])
  function appendClickedCard(e) {
    const copyOfMatchingPairs = [...matchingPairs]
    const pokemonId = getPokemonIdFromImgUrl(e)
    setMatchingPairs(copyOfMatchingPairs.concat(pokemonId))
  }
  useEffect(()=> {
    const matchCards = () => {
      const copyOfMatchingPairs = [...matchingPairs]
      const copyOfIsCardOpen = [...isCardOpen]
      if (matchingPairs.length >= 2 && matchingPairs.length % 2 === 0) {
        setTimeout(()=>setCounter(0),500)
        console.log(pair.length === 2, pair[pair.length-1]===pair[pair.length-2], matchingPairs[matchingPairs.length-1] !== matchingPairs[matchingPairs.length-2])
        if ((pair.length >= 2 && pair[pair.length-1]===pair[pair.length-2]) || matchingPairs[matchingPairs.length-1] !== matchingPairs[matchingPairs.length-2] ) {
          setMatchingPairs(copyOfMatchingPairs.slice(0,-2))
          copyOfIsCardOpen[pair[pair.length-1]] = false
          copyOfIsCardOpen[pair[pair.length-2]] = false
          setTimeout(()=>setIsCardOpen(copyOfIsCardOpen),500)
          setPair(pair.slice(0,-2))
        } 
      }
    }
    matchCards()
  },[matchingPairs, isCardOpen, pair])
  
  const renderPokemons = () => {
    return pokemons.map((pokemon, idx) => <Card key={idx} index={idx} pokemon={pokemon} handleClick={handleClick} isCardOpen={isCardOpen[idx]} counter={counter}/>)
  }

  return (
    <ul className={'deck'}>
      {renderPokemons()}
    </ul>
  )
}