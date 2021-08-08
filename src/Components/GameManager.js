import React, { useEffect, useState } from "react"
import Deck from "./Deck"
import shuffle, { getPokemonIdFromImgUrl } from "../HelperFunctions"
import GameControl from "./GameControl"

export default function GameManager({ fetchReviews }) {
  const [pokemons, setPokemons] = useState([])
  const [deckSize, setDeckSize] = useState(20)
  useEffect(() => {
    fetchPokemons()
    setIsCardOpen(new Array(deckSize).fill(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckSize])
  function fetchPokemons() {
    const pokemonUrls = []
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`)
      .then((resp) => resp.json())
      .then((pokemons) => {
        pokemons.results.forEach((pokemon) => {
          pokemonUrls.push(pokemon.url)
        })
        const allURLsPromise = pokemons.results.map((result) => {
          return fetch(result.url)
            .then((resp) => resp.json())
            .then((json) => json.sprites.other.dream_world.front_default)
        })

        Promise.all(allURLsPromise).then((allURLs) => generatePokemons(allURLs))
      })
  }
  function generatePokemons(pokemonImages) {
    const arr = shuffle(pokemonImages)
      .map((pokemonImg, idx) => idx < deckSize / 2 && pokemonImg)
      .filter((pokemonImg) => pokemonImg)
    const arrClone = [...arr]
    const combinedArrs = shuffle(arr.concat(arrClone))
    setPokemons(combinedArrs)
  }

  const [isCardOpen, setIsCardOpen] = useState(new Array(deckSize).fill(false))
  const [pairOfPokeIndexes, setPairOfPokeIndexes] = useState([])
  const [pairOfPokeIds, setPairOfPokeIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [disableCardIndicator, setDisableCardIndicator] = useState(0)
  function handleClick(e, index) {
    setMoves(moves + 0.5)
    setDisableCardIndicator(disableCardIndicator + 1)
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index] = true
    setIsCardOpen(copyOfIsCardOpen)
    setPairOfPokeIndexes(pairOfPokeIndexes.concat(index))
    setPairOfPokeIds(pairOfPokeIds.concat(getPokemonIdFromImgUrl(e)))
  }
  useEffect(() => {
    const matchCards = () => {
      const timeOut = 500
      const copyOfIsCardOpen = [...isCardOpen]
      /*if two cards are selected, even it's the same card clicked twice, disable all buttons from 
      receiving clicks within the given timeout and clean up pairPokeIndexes and pairpokeIds */
      if (pairOfPokeIndexes.length === 2) {
        setTimeout(() => setDisableCardIndicator(0), timeOut)
        setPairOfPokeIndexes([])
        setPairOfPokeIds([])
        /* if additionally, their id's don't match, disable all buttons from receiving clicks 
        and hide the selected cards within the given timeOut */
        if (pairOfPokeIds[0] !== pairOfPokeIds[1]) {
          setPairOfPokeIds([])
          setPairOfPokeIndexes([])
          copyOfIsCardOpen[pairOfPokeIndexes[0]] = false
          copyOfIsCardOpen[pairOfPokeIndexes[1]] = false
          setTimeout(() => {
            setDisableCardIndicator(0)
            setIsCardOpen(copyOfIsCardOpen)
          }, timeOut)
        }
      }
    }
    matchCards()
  }, [pairOfPokeIds, isCardOpen, pairOfPokeIndexes, disableCardIndicator])

  function restartGame() {
    setIsCardOpen(new Array(deckSize).fill(false))
    setPairOfPokeIndexes([])
    setMoves(0)
    setDisableCardIndicator(0)
    setPairOfPokeIds([])
    fetchPokemons()
  }

  function handleGameDifficulty(e) {
    switch (e.target.value) {
      case "easy":
        setDeckSize(10)
        break
      case "medium":
        setDeckSize(20)
        break
      case "hard":
        setDeckSize(30)
        break
      default:
        setDeckSize(20)
    }
    setPairOfPokeIndexes([])
    setMoves(0)
    setDisableCardIndicator(0)
    setPairOfPokeIds([])
  }

  return (
    <>
      <GameControl
        moves={moves}
        isCardOpen={isCardOpen}
        restartGame={restartGame}
        fetchReviews={fetchReviews}
        handleGameDifficulty={handleGameDifficulty}
        deckSize={deckSize}
      />
      <Deck
        pokemons={pokemons}
        handleClick={handleClick}
        isCardOpen={isCardOpen}
        disableCardIndicator={disableCardIndicator}
      />
    </>
  )
}
