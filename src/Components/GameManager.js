import React, { useEffect, useState } from "react";
import Deck from './Deck'
import shuffle, {getPokemonIdFromImgUrl} from '../HelperFunctions'
import GameStats from "./GameStats";

const PENALTY_SECS = 1

export default function GameManager({fetchReviews}) {
  
  const [pokemons, setPokemons] = useState([])
  const [deckSize, setDeckSize] = useState(20)
  useEffect(()=> {
   fetchPokemons()
   setIsCardOpen(new Array(deckSize).fill(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deckSize])
  function fetchPokemons() {
    const pokemonUrls = []
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60`)
      .then(resp => resp.json())
      .then(pokemons => {
        pokemons.results.forEach(pokemon => {
          pokemonUrls.push(pokemon.url)
        })

        const allURLsPromise = pokemons.results.map(result => {
          return fetch(result.url)
            .then(resp => resp.json())
            .then(json => json.sprites.other.dream_world.front_default)
        })

        Promise.all(allURLsPromise)
          .then(allURLs => generatePokemons(allURLs))
      })
  }
  function generatePokemons(pokemonImages) {
    const arr = shuffle(pokemonImages).map((pokemonImg,idx)=> idx<deckSize/2 && pokemonImg).filter(pokemonImg=> pokemonImg)
    const arrClone = [...arr]
    const combinedArrs = shuffle(arr.concat(arrClone))
    setPokemons(combinedArrs)
  }

  const [isCardOpen, setIsCardOpen] = useState(new Array(deckSize).fill(false))
  const [inProgress, setInProgress] = useState([])
  // const [pairIndexes, setPairIndexes] = useState([])
  const [moves, setMoves] = useState(0)
  // const [disableCardIndicator, setDisableCardIndicator] = useState(0)
  function handleClick (e,index) {
    setMoves(moves + 0.5)

    if (inProgress.length === 1 && inProgress[0].index === index) {
      return
    }

    setIsCardOpen(isCardOpen.map((isOpen, idx) => idx === index ? true : isOpen))

    if (inProgress.length === 0) {
      setInProgress([{index: index, pokemonID: getPokemonIdFromImgUrl(e)}])
    } else {
      const newlyClicked =  {index: index, pokemonID: getPokemonIdFromImgUrl(e)}
      setInProgress([...inProgress, newlyClicked])
      if (inProgress[0].pokemonID === newlyClicked.pokemonID) {
        setInProgress([])
      } else {
        setTimeout(() => {
          setIsCardOpen(isCardOpen.map((isOpen, idx) => idx === inProgress[0].index || idx === newlyClicked.index ? false : isOpen))
          setInProgress([])
        }, PENALTY_SECS * 1000)
      }
    }

    // setDisableCardIndicator(disableCardIndicator + 1)
    // const copyOfIsCardOpen = [...isCardOpen]
    // copyOfIsCardOpen[index]=true
    // setIsCardOpen(copyOfIsCardOpen)
    // setPairIndexes(pairIndexes.concat(index))
    // appendClickedCard(e)
  }
  
  // const [matchingPairs, setMatchingPairs] = useState([])
  // function appendClickedCard(e) {
  //   setMatchingPairs(matchingPairs.concat(getPokemonIdFromImgUrl(e)))
  // }
  // useEffect(()=> {
  //   const matchCards = () => {
  //     const copyOfIsCardOpen = [...isCardOpen]
  //     if (matchingPairs.length >= 2 && matchingPairs.length % 2 === 0) {
  //       setTimeout(()=>setDisableCardIndicator(0),500)
  //       if ((pairIndexes.length >= 2 && 
  //           pairIndexes[pairIndexes.length-1]===pairIndexes[pairIndexes.length-2]) || 
  //           matchingPairs[matchingPairs.length-1] !== matchingPairs[matchingPairs.length-2] ) {
  //         setMatchingPairs(matchingPairs.slice(0,-2))
  //         copyOfIsCardOpen[pairIndexes[pairIndexes.length-1]] = false
  //         copyOfIsCardOpen[pairIndexes[pairIndexes.length-2]] = false
  //         setTimeout(()=>setIsCardOpen(copyOfIsCardOpen),500)
  //         setPairIndexes(pairIndexes.slice(0,-2))
  //       } 
  //     }
  //   }
  //   matchCards()
  // },[matchingPairs, isCardOpen, pairIndexes, disableCardIndicator])
  
  function restartGame() {
    setIsCardOpen(new Array(deckSize).fill(false))
    // setPairIndexes([])
    setMoves(0)
    // setDisableCardIndicator(0)
    // setMatchingPairs([])
    fetchPokemons()
    setInProgress([])
  }

  function handleGameDifficulty(e) {
    switch (e.target.value) {
      case 'easy' : setDeckSize(10)
      break
      case 'medium' : setDeckSize(20)
      break
      case 'hard' : setDeckSize(30)
      break
      default: setDeckSize(20)
    }
    // setPairIndexes([])
    setMoves(0)
    // setDisableCardIndicator(0)
    // setMatchingPairs([])
  }

  const disableCardIndicator = inProgress.length === 2 && inProgress[0].pokemonID !== inProgress[1].pokemonID

  return (
    <>
      <GameStats 
        moves={moves} 
        isCardOpen={isCardOpen} 
        restartGame={restartGame} 
        fetchReviews={fetchReviews} 
        handleGameDifficulty={handleGameDifficulty}
        deckSize={deckSize}/>
      <Deck 
        pokemons={pokemons} 
        handleClick={handleClick} 
        isCardOpen={isCardOpen} 
        disableCardIndicator={disableCardIndicator}/>
    </>
  )
}
