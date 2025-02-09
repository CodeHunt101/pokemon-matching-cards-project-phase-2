import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Deck from '../../src/Components/Deck'
import Card from '../../src/Components/Card'

vi.mock('../../src/Components/Card', () => ({
  default: vi.fn(() => null),
}))

vi.mock('react-bootstrap', () => ({
  Spinner: vi.fn(() => <div data-testid="spinner">Loading...</div>),
}))

describe('Deck Component', () => {
  const mockPokemons = [
    { id: 1, spriteUrl: 'pikachu.jpg' },
    { id: 2, spriteUrl: 'charmander.jpg' },
    { id: 3, spriteUrl: 'bulbasaur.jpg' },
  ]

  const defaultProps = {
    pokemons: mockPokemons,
    handleClick: vi.fn(),
    isCardOpen: [false, false, false],
    disableCardIndicator: 0,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders deck container', () => {
    const { container } = render(<Deck {...defaultProps} />)
    expect(container.getElementsByClassName('deck').length).toBeGreaterThan(0)
  })

  it('renders spinner when no pokemons are available', () => {
    render(<Deck {...defaultProps} pokemons={[]} />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('hides spinner when pokemons are available', () => {
    render(<Deck {...defaultProps} />)
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  it('renders correct number of Card components', () => {
    render(<Deck {...defaultProps} />)
    expect(Card).toHaveBeenCalledTimes(mockPokemons.length)
  })

  it('passes correct props to each Card component', () => {
    render(<Deck {...defaultProps} />)
    const calls = vi.mocked(Card).mock.calls
    mockPokemons.forEach((pokemon, idx) => {
      expect(calls[idx][0]).toEqual({
        index: idx,
        pokemon: pokemon.spriteUrl,
        handleClick: defaultProps.handleClick,
        isCardOpen: defaultProps.isCardOpen[idx],
        disableCardIndicator: defaultProps.disableCardIndicator,
      })
    })
  })

  it('correctly applies isCardOpen states to each Card', () => {
    const customIsCardOpen = [true, false, true]
    render(<Deck {...defaultProps} isCardOpen={customIsCardOpen} />)
    const calls = vi.mocked(Card).mock.calls
    calls.forEach((call, idx) => {
      expect(call[0].isCardOpen).toBe(customIsCardOpen[idx])
    })
  })

  it('passes disableCardIndicator prop correctly to all Cards', () => {
    const disableCardIndicator = 2
    render(
      <Deck {...defaultProps} disableCardIndicator={disableCardIndicator} />
    )
    const calls = vi.mocked(Card).mock.calls
    calls.forEach((call) => {
      expect(call[0].disableCardIndicator).toBe(disableCardIndicator)
    })
  })

  it('applies the deck className correctly', () => {
    const { container } = render(<Deck {...defaultProps} />)
    expect(container.firstChild).toHaveClass('deck')
  })
})
