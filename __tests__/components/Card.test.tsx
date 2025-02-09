import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from '../../src/Components/Card'

describe('Card Component', () => {
  const defaultProps = {
    pokemon: 'pikachu.jpg',
    index: 0,
    handleClick: vi.fn(),
    isCardOpen: false,
    disableCardIndicator: 0,
  }

  it('renders button without crashing', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls handleClick when clicked', () => {
    render(<Card {...defaultProps} />)
    fireEvent.click(screen.getByRole('button'))
    expect(defaultProps.handleClick).toHaveBeenCalled()
  })

  it('calls handleClick with correct index', () => {
    render(<Card {...defaultProps} />)
    fireEvent.click(screen.getByRole('button'))
    expect(defaultProps.handleClick).toHaveBeenCalledWith(expect.any(Object), 0)
  })

  it('disables button when disableCardIndicator is 2', () => {
    render(<Card {...defaultProps} disableCardIndicator={2} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables button when isCardOpen is true', () => {
    render(<Card {...defaultProps} isCardOpen={true} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('adds open class to image when isCardOpen is true', () => {
    render(<Card {...defaultProps} isCardOpen={true} />)
    expect(screen.getByAltText('pikachu.jpg')).toHaveClass('open')
  })

  it('removes hidden class from image when isCardOpen is true', () => {
    render(<Card {...defaultProps} isCardOpen={true} />)
    expect(screen.getByAltText('pikachu.jpg')).not.toHaveClass('hidden')
  })

  it('adds hidden class to image when isCardOpen is false', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByAltText('pikachu.jpg')).toHaveClass('hidden')
  })

  it('removes open class from image when isCardOpen is false', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByAltText('pikachu.jpg')).not.toHaveClass('open')
  })

  it('renders image with correct src attribute', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pikachu.jpg')
  })

  it('renders image with correct alt attribute', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'pikachu.jpg')
  })

  it('button has correct class', () => {
    render(<Card {...defaultProps} />)
    expect(screen.getByRole('button')).toHaveClass('card')
  })
})
