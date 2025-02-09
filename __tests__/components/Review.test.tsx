import React from 'react'
import { render, screen } from '@testing-library/react'
import Review from '../../src/components/Review'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'

describe('Review component', () => {
  const sampleReview = {
    firstName: 'Alice',
    lastName: 'Smith',
    rating: 4,
    comments: 'Great game, loved it!',
    gameDifficulty: 'Medium',
    datePosted: new Date('2023-02-08T12:00:00Z').getTime(),
    moves: 15,
  }

  it('renders the header with the child icon', () => {
    const { container } = render(<Review review={sampleReview} />)
    const childIcon = container.querySelector('i.fas.fa-child')
    expect(childIcon).toBeInTheDocument()
  })

  it('renders the reviewer name in the header', () => {
    const { container } = render(<Review review={sampleReview} />)
    const headerText = container.querySelector('.card-header')
    expect(headerText).toBeInTheDocument()
  })

  it('renders the formatted date in the header', () => {
    const { container } = render(<Review review={sampleReview} />)
    const formattedDate = new Date(sampleReview.datePosted).toLocaleString()
    const headerText = container.querySelector('.card-header')
    expect(headerText?.textContent).toMatch(formattedDate)
  })

  it('renders the rating as stars', () => {
    const { container } = render(<Review review={sampleReview} />)
    const cardTitle = container.querySelector('.card-title')
    expect(cardTitle).toBeInTheDocument()
  })

  it('renders the correct number of star icons', () => {
    const { container } = render(<Review review={sampleReview} />)
    const starIcons = container.querySelectorAll('.card-title i')
    expect(starIcons.length).toBe(5)
  })

  it('renders the review comments', () => {
    render(<Review review={sampleReview} />)
    expect(
      screen.getByText(sampleReview.comments, { exact: false })
    ).toBeInTheDocument()
  })

  it('renders the game difficulty in the card text', () => {
    render(<Review review={sampleReview} />)
    expect(
      screen.getByText(`Difficulty: ${sampleReview.gameDifficulty}`, {
        exact: false,
      })
    ).toBeInTheDocument()
  })

  it('renders the moves count in the card text', () => {
    render(<Review review={sampleReview} />)
    expect(
      screen.getByText(`Moves: ${sampleReview.moves}`, { exact: false })
    ).toBeInTheDocument()
  })
})
