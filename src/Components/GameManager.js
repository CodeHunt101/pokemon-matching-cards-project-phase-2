import React, { useEffect, useState } from "react";
import Deck from './Deck'
import shuffle, { getPokemonIdFromImgUrl } from '../HelperFunctions'
import GameStats from "./GameStats";

const PENALTY_SECS = 1

export default function GameManager({ fetchReviews }) {

  const [pokemons, setPokemons] = useState([])
  const [deckSize, setDeckSize] = useState(20)
  useEffect(() => {
    fetchPokemons()
    setState({
      moves: 0,
      isCardOpen: new Array(deckSize).fill(false),
      inProgress: [],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckSize])
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
    const arr = shuffle(pokemonImages).map((pokemonImg, idx) => idx < deckSize / 2 && pokemonImg).filter(pokemonImg => pokemonImg)
    const arrClone = [...arr]
    const combinedArrs = shuffle(arr.concat(arrClone))
    setPokemons(combinedArrs)
  }

  const [state, setState] = useState({
    moves: 0,
    isCardOpen: new Array(deckSize).fill(false),
    inProgress: [],
  })

  const { moves, isCardOpen, inProgress } = state

  function handleClick(e, index) {
    setState((prevState) => {

      if (prevState.inProgress.length === 2 ||
        (prevState.inProgress.length === 1 && prevState.inProgress[0].index === index)) {
        return prevState
      }

      const newlyClicked = { index: index, pokemonID: getPokemonIdFromImgUrl(e) }
      if (prevState.inProgress.length === 0) {
        return {
          ...prevState,
          moves: moves + 0.5,
          isCardOpen: isCardOpen.map((isOpen, idx) => idx === index ? true : isOpen),
          inProgress: [ newlyClicked ],
        }
      }

      let newInProgress = []
      if (prevState.inProgress[0].pokemonID !== newlyClicked.pokemonID) {
        newInProgress = [...prevState.inProgress, newlyClicked]

        setTimeout(() => {
          setState({
            ...prevState,
            isCardOpen: isCardOpen.map((isOpen, idx) => idx === prevState.inProgress[0].index || idx === newlyClicked.index ? false : isOpen),
            inProgress: [],
          })
        }, PENALTY_SECS * 1000)
      }

      return {
        ...prevState,
        moves: moves + 0.5,
        isCardOpen: isCardOpen.map((isOpen, idx) => idx === index ? true : isOpen),
        inProgress: newInProgress,
      }
    })
  }

  function restartGame() {
    setState({
      moves: 0,
      isCardOpen: new Array(deckSize).fill(false),
      inProgress: [],
    })
    fetchPokemons()
  }

  function handleGameDifficulty(e) {
    switch (e.target.value) {
      case 'easy': setDeckSize(10)
        break
      case 'medium': setDeckSize(20)
        break
      case 'hard': setDeckSize(30)
        break
      default: setDeckSize(20)
    }

    setState({
      moves: 0,
      isCardOpen: new Array(deckSize).fill(false),
      inProgress: [],
    })
  }

  return (
    <>
      <GameStats
        moves={moves}
        isCardOpen={isCardOpen}
        restartGame={restartGame}
        fetchReviews={fetchReviews}
        handleGameDifficulty={handleGameDifficulty}
        deckSize={deckSize} />
      <Deck
        pokemons={pokemons}
        handleClick={handleClick}
        isCardOpen={isCardOpen}
        />
    </>
  )
}
