import { useEffect, useState } from 'react'
import Deck from './Deck'
import shuffle, { getPokemonIdFromImgUrl } from '../Helpers'
import GameControl from './GameControl'

type GameManagerProps = {
  fetchReviews: () => void
}

export default function GameManager({ fetchReviews }: GameManagerProps) {
  const [pokemons, setPokemons] = useState<unknown[]>([])
  const [deckSize, setDeckSize] = useState<number>(20)
  useEffect(() => {
    fetchPokemons()
    setIsCardOpen(new Array(deckSize).fill(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckSize])

  async function fetchPokemons() {
    setPokemons([])
    // Enum a list from 1 to 151, take and shuffle the first half of the deck, clone and shuffle again, join.
    const allPokeIds = new Array(151).fill(null).map((_id, idx) => idx + 1)
    const samplePokeIds = shuffle(allPokeIds).slice(0, deckSize / 2)
    const cloneSamplePokeIds = [...samplePokeIds]
    const finalSampleOfPokeIds = shuffle(
      samplePokeIds.concat(cloneSamplePokeIds)
    )

    const pokeImageUrls = await Promise.all(
      finalSampleOfPokeIds.map(async (pokeId: number) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        const pokemon = await resp?.json()
        return pokemon?.sprites.other.dream_world.front_default
      })
    )
    setPokemons(pokeImageUrls)
  }

  const [isCardOpen, setIsCardOpen] = useState(new Array(deckSize).fill(false))
  const [newPairOfPokesClicked, setNewPokesClicked] = useState({
    pokeIndexes: [],
    pokeIds: [],
  })
  const [moves, setMoves] = useState(0)
  const [disableCardIndicator, setDisableCardIndicator] = useState(0)

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number | ConcatArray<never>
  ) {
    //Set clicked card (index) to true and keep track of other states
    setMoves((prevMoves) => prevMoves + 0.5)
    setDisableCardIndicator(
      (prevDisableCardIndicator) => prevDisableCardIndicator + 1
    )
    const copyOfIsCardOpen = [...isCardOpen]
    copyOfIsCardOpen[index as number] = true
    setIsCardOpen(copyOfIsCardOpen)
    setNewPokesClicked((prevNewPokesClicked) => ({
      pokeIndexes: [
        ...prevNewPokesClicked.pokeIndexes.concat(index as ConcatArray<never>),
      ],
      pokeIds: prevNewPokesClicked.pokeIds.concat(getPokemonIdFromImgUrl(e)),
    }))
  }
  useEffect(() => {
    const timeOut = 500
    const copyOfIsCardOpen = [...isCardOpen]
    /*if two cards are selected, even if it's the same card clicked twice, disable all cards from 
    receiving clicks within the given timeout and clean up pairPokeIndexes and pairpokeIds */
    if (newPairOfPokesClicked.pokeIndexes.length === 2) {
      setTimeout(() => setDisableCardIndicator(0), timeOut)
      setNewPokesClicked({ pokeIndexes: [], pokeIds: [] })
      /* if additionally, their id's don't match, disable all cards from receiving clicks 
      and hide the selected cards within the given timeOut */
      if (
        newPairOfPokesClicked.pokeIds[0] !== newPairOfPokesClicked.pokeIds[1]
      ) {
        setNewPokesClicked({ pokeIndexes: [], pokeIds: [] })
        copyOfIsCardOpen[newPairOfPokesClicked.pokeIndexes[0]] = false
        copyOfIsCardOpen[newPairOfPokesClicked.pokeIndexes[1]] = false
        setTimeout(() => {
          setIsCardOpen(copyOfIsCardOpen)
        }, timeOut)
      }
    }
  }, [newPairOfPokesClicked, isCardOpen, disableCardIndicator])

  function restartGame() {
    setIsCardOpen(new Array(deckSize).fill(false))
    setNewPokesClicked({ pokeIndexes: [], pokeIds: [] })
    setMoves(0)
    setDisableCardIndicator(0)
    fetchPokemons()
  }

  function handleGameDifficulty(e: React.ChangeEvent<HTMLInputElement>) {
    const difficulty = {
      easy: () => setDeckSize(10),
      medium: () => setDeckSize(20),
      hard: () => setDeckSize(30),
    }
    setNewPokesClicked({ pokeIndexes: [], pokeIds: [] })
    setMoves(0)
    setDisableCardIndicator(0)
    difficulty[e.target.value as keyof typeof difficulty]()
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
