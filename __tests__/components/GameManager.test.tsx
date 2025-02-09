import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import GameManager from '../../src/Components/GameManager'
import '@testing-library/jest-dom'

vi.mock('../../src/Helpers', () => ({
  default: (array: number[]) => array,
  getPokemonIdFromImgUrl: (_e: any) => 1,
}))

vi.mock('../../src/api/services', () => ({
  pokemonApi: {
    getPokemonSprite: vi.fn((pokeId: number) =>
      Promise.resolve(`url-${pokeId}`)
    ),
  },
}))

vi.mock('../../src/components/Deck', () => ({
  default: (props: any) => (
    <div data-testid="deck">{JSON.stringify(props)}</div>
  ),
}))

vi.mock('../../src/components/GameControl', () => ({
  default: (props: any) => (
    <div data-testid="gamecontrol">{JSON.stringify(props)}</div>
  ),
}))

describe('GameManager component', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes game and renders Deck and GameControl with correct props', async () => {
    render(<GameManager />)

    await waitFor(() => {
      expect(screen.getByTestId('deck')).toBeInTheDocument()
    })

    const deckProps = JSON.parse(screen.getByTestId('deck').textContent || '{}')
    expect(deckProps.pokemons).toHaveLength(20)
  })

  it('GameControl receives the correct moves prop', async () => {
    render(<GameManager />)

    await waitFor(() => {
      expect(screen.getByTestId('gamecontrol')).toBeInTheDocument()
    })

    const gameControlProps = JSON.parse(
      screen.getByTestId('gamecontrol').textContent || '{}'
    )
    expect(gameControlProps.moves).toBe(0)
  })

  it('GameControl receives the correct deckSize prop', async () => {
    render(<GameManager />)

    await waitFor(() => {
      expect(screen.getByTestId('gamecontrol')).toBeInTheDocument()
    })

    const gameControlProps = JSON.parse(
      screen.getByTestId('gamecontrol').textContent || '{}'
    )
    expect(gameControlProps.deckSize).toBe(20)
  })

  it('GameControl receives an array for isCardOpen prop', async () => {
    render(<GameManager />)

    await waitFor(() => {
      expect(screen.getByTestId('gamecontrol')).toBeInTheDocument()
    })

    const gameControlProps = JSON.parse(
      screen.getByTestId('gamecontrol').textContent || '{}'
    )
    expect(Array.isArray(gameControlProps.isCardOpen)).toBe(true)
  })

  it('displays an error message when game initialization fails', async () => {
    const { pokemonApi } = await import('../../src/api/services')
    ;(pokemonApi.getPokemonSprite as any).mockRejectedValue(new Error('fail'))

    render(<GameManager />)

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to initialize the game/i)
      ).toBeInTheDocument()
    })
  })
})
