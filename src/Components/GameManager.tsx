import { useEffect, useState } from 'react'
import Deck from './Deck'
import shuffle, { getPokemonIdFromImgUrl } from '../Helpers'
import GameControl from './GameControl'
import { pokemonApi } from '../api/services'

export type Pokemon = {
  id: number
  spriteUrl: string
}

export default function GameManager() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [deckSize, setDeckSize] = useState<number>(20)
  const [isCardOpen, setIsCardOpen] = useState<boolean[]>([])
  const [selectedPairs, setSelectedPairs] = useState<{
    indexes: number[]
    ids: number[]
  }>({ indexes: [], ids: [] })
  const [moves, setMoves] = useState<number>(0)
  const [disableCards, setDisableCards] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initialiseGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckSize])

  const initialiseGame = async () => {
    try {
      setIsCardOpen(new Array(deckSize).fill(false))
      await fetchPokemons()
      // Reset game progress states:
      setSelectedPairs({ indexes: [], ids: [] })
      setMoves(0)
      setDisableCards(false)
      setError(null)
    } catch (err) {
      setError('Failed to initialize the game.')
    }
  }

  const fetchPokemons = async () => {
    const allPokeIds = Array.from({ length: 151 }, (_, idx) => idx + 1)
    // Select unique Pokémon for half the deck size (since we need pairs)
    const samplePokeIds = shuffle(allPokeIds).slice(0, deckSize / 2)
    // Duplicate and shuffle to create matching pairs
    const pairedPokeIds = shuffle([...samplePokeIds, ...samplePokeIds])

    const pokeImageUrls: Pokemon[] = await Promise.all(
      pairedPokeIds.map(async (pokeId) => {
        const spriteUrl = (await pokemonApi.getPokemonSprite(pokeId)) || ''

        return { id: pokeId, spriteUrl }
      })
    )

    setPokemons(pokeImageUrls)
  }

/**
 * Handles the click event on a card in the game. 
 * Prevents further interaction if the cards are being evaluated or if the card is already open. 
 * Increments the move count and locks the board during card evaluation. 
 * Updates the state of the selected card to open, and adds it to the list of selected pairs. 
 * If two cards are selected, checks for a match:
 * - If matched, keeps the cards open.
 * - If not matched, flips both cards back after a delay.
 * Unlocks the board after evaluation.
 * 
 * @param e - The mouse event triggered by clicking a card.
 * @param index - The index of the clicked card in the deck.
 */

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    if (disableCards || isCardOpen[index]) return // Prevent interaction during animations/matches

    setMoves((prev) => prev + 1)
    setDisableCards(true) // Lock board during card evaluation

    const newIsCardOpen = [...isCardOpen]
    newIsCardOpen[index] = true
    setIsCardOpen(newIsCardOpen)

    const clickedPokeId = getPokemonIdFromImgUrl(e)
    const updatedPairs = {
      indexes: [...selectedPairs.indexes, index],
      ids: [...selectedPairs.ids, clickedPokeId],
    }
    setSelectedPairs(updatedPairs)

    if (updatedPairs.ids.length === 2) {
      if (updatedPairs.ids[0] === updatedPairs.ids[1]) {
        // Successful match - keep cards open
        setSelectedPairs({ indexes: [], ids: [] })
        setDisableCards(false)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          const resetIsCardOpen = [...newIsCardOpen]
          resetIsCardOpen[updatedPairs.indexes[0]] = false
          resetIsCardOpen[updatedPairs.indexes[1]] = false
          setIsCardOpen(resetIsCardOpen)
          setSelectedPairs({ indexes: [], ids: [] })
          setDisableCards(false)
        }, 500) // delay for player to see both cards
      }
    } else {
      setDisableCards(false) // Single card flipped - unlock board
    }
  }

  const restartGame = () => {
    initialiseGame()
  }

  const handleGameDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const difficultySettings: Record<string, number> = {
      easy: 10,
      medium: 20,
      hard: 30,
    }
    const newDeckSize = difficultySettings[e.target.value] || 20
    setDeckSize(newDeckSize)
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
      <GameControl
        moves={moves}
        isCardOpen={isCardOpen}
        restartGame={restartGame}
        handleGameDifficulty={handleGameDifficulty}
        deckSize={deckSize}
      />
      <Deck
        pokemons={pokemons}
        handleClick={handleClick}
        isCardOpen={isCardOpen}
        disableCardIndicator={disableCards ? 1 : 0}
      />
    </>
  )
}
