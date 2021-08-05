import React, { useEffect, useState } from "react";
import Deck from './Deck'
import shuffle, {getPokemonIdFromImgUrl} from '../HelperFunctions'
import GameStats from "./GameStats";

export default function GameManager({fetchReviews}) {
  
  const [pokemons, setPokemons] = useState([])
  const [deckSize] = useState(2)
  useEffect(()=> {
   fetchPokemons()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  function fetchPokemons() {
    const pokemonUrls = []
    const pokemonImages = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
      .then(resp => resp.json())
      .then(pokemons => {
        pokemons.results.forEach(pokemon => {
          pokemonUrls.push(pokemon.url)
        })
        return pokemonUrls.map(url=>
         fetch(url)
          .then(resp=>resp.json())
          .then(pokemonUrl => pokemonUrl.sprites.other.dream_world.front_default)
        )
      })
    Promise.resolve(pokemonImages)
    .then((pokemonImages)=>Promise.all(pokemonImages)
      .then((pokemonImages)=>generatePokemons(pokemonImages)))
  }
  function generatePokemons(pokemonImages) {
    const arr = shuffle(pokemonImages).map((pokemonImg,idx)=> idx<deckSize/2 && pokemonImg).filter(pokemonImg=> pokemonImg)
    const arrClone = [...arr]
    const combinedArrs = shuffle(arr.concat(arrClone))
    setPokemons(combinedArrs)
  }

  const [isCardOpen, setIsCardOpen] = useState(new Array(deckSize).fill(false))
  const [pairIndexes, setPairIndexes] = useState([])
  const [moves, setMoves] = useState(0)
  const [disableCardIndicator, setDisableCardIndicator] = useState(0)
  function handleClick (e,index) {
    setMoves(moves + 0.5)
    setDisableCardIndicator(disableCardIndicator + 1)
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index]=true
    setIsCardOpen(copyOfIsCardOpen)
    setPairIndexes(pairIndexes.concat(index))
    appendClickedCard(e)
  }
  
  const [matchingPairs, setMatchingPairs] = useState([])
  function appendClickedCard(e) {
    setMatchingPairs(matchingPairs.concat(getPokemonIdFromImgUrl(e)))
  }
  useEffect(()=> {
    const matchCards = () => {
      const copyOfIsCardOpen = [...isCardOpen]
      if (matchingPairs.length >= 2 && matchingPairs.length % 2 === 0) {
        setTimeout(()=>setDisableCardIndicator(0),500)
        if ((pairIndexes.length >= 2 && 
            pairIndexes[pairIndexes.length-1]===pairIndexes[pairIndexes.length-2]) || 
            matchingPairs[matchingPairs.length-1] !== matchingPairs[matchingPairs.length-2] ) {
          setMatchingPairs(matchingPairs.slice(0,-2))
          copyOfIsCardOpen[pairIndexes[pairIndexes.length-1]] = false
          copyOfIsCardOpen[pairIndexes[pairIndexes.length-2]] = false
          setTimeout(()=>setIsCardOpen(copyOfIsCardOpen),500)
          setPairIndexes(pairIndexes.slice(0,-2))
        } 
      }
    }
    matchCards()
  },[matchingPairs, isCardOpen, pairIndexes, disableCardIndicator])
  
  function restartGame() {
    setIsCardOpen(new Array(deckSize).fill(false))
    setPairIndexes([])
    setMoves(0)
    setDisableCardIndicator(0)
    setMatchingPairs([])
    fetchPokemons()
  }
  return (
    <>
      <GameStats moves={moves} isCardOpen={isCardOpen} restartGame={restartGame} fetchReviews={fetchReviews}/>
      <Deck pokemons={pokemons} 
            handleClick={handleClick} 
            isCardOpen={isCardOpen} 
            disableCardIndicator={disableCardIndicator}/>
    </>
  )
}