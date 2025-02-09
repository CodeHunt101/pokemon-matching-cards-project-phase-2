import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react'
import ReviewsManager from '../../src/components/ReviewsManager'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../src/Helpers', () => ({
  generateStars: (className: string) => ({
    '0': (
      <div data-testid="avg-rating" data-rating="0">
        0
      </div>
    ),
    '0.5': (
      <div data-testid="avg-rating" data-rating="0.5">
        0.5
      </div>
    ),
    '1': (
      <div data-testid="avg-rating" data-rating="1">
        1
      </div>
    ),
    '1.5': (
      <div data-testid="avg-rating" data-rating="1.5">
        1.5
      </div>
    ),
    '2': (
      <div data-testid="avg-rating" data-rating="2">
        2
      </div>
    ),
    '2.5': (
      <div data-testid="avg-rating" data-rating="2.5">
        2.5
      </div>
    ),
    '3': (
      <div data-testid="avg-rating" data-rating="3">
        3
      </div>
    ),
    '3.5': (
      <div data-testid="avg-rating" data-rating="3.5">
        3.5
      </div>
    ),
    '4': (
      <div data-testid="avg-rating" data-rating="4">
        4
      </div>
    ),
    '4.5': (
      <div data-testid="avg-rating" data-rating="4.5">
        4.5
      </div>
    ),
    '5': (
      <div data-testid="avg-rating" data-rating="5">
        5
      </div>
    ),
  }),
}))

vi.mock('../../src/components/Review', () => ({
  default: ({ review }: { review: any }) => (
    <div data-testid="review">{review.firstName}</div>
  ),
}))

describe('ReviewsManager component', () => {
  const reviews = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      rating: 5,
      comments: 'Great!',
      gameDifficulty: 'Medium',
      datePosted: 1000,
      moves: 10,
    },
    {
      firstName: 'Bob',
      lastName: 'Jones',
      rating: 4,
      comments: 'Good',
      gameDifficulty: 'Easy',
      datePosted: 2000,
      moves: 12,
    },
    {
      firstName: 'Carol',
      lastName: 'Taylor',
      rating: 5,
      comments: 'Excellent',
      gameDifficulty: 'Hard',
      datePosted: 3000,
      moves: 8,
    },
  ]

  beforeEach(() => {
    render(<ReviewsManager reviews={reviews} />)
  })

  it('renders header with reviews title', () => {
    expect(
      screen.getByRole('heading', { name: /reviews/i })
    ).toBeInTheDocument()
  })

  it('renders filter label', () => {
    expect(screen.getByText(/Sort by oldest review/i)).toBeInTheDocument()
  })

  it('renders checkbox', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders select dropdown', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders correct average rating', () => {
    expect(screen.getByTestId('avg-rating')).toHaveAttribute(
      'data-rating',
      '4.5'
    )
  })

  it('renders reviews in reversed order by default', () => {
    const reviewElements = screen.getAllByTestId('review')
    expect(reviewElements[0]).toHaveTextContent('Carol')
  })

  it('renders second review in reversed order', () => {
    const reviewElements = screen.getAllByTestId('review')
    expect(reviewElements[1]).toHaveTextContent('Bob')
  })

  it('renders third review in reversed order', () => {
    const reviewElements = screen.getAllByTestId('review')
    expect(reviewElements[2]).toHaveTextContent('Alice')
  })

  it('filters reviews correctly by stars', async () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } })
    await waitFor(() => {
      const reviewElements = screen.getAllByTestId('review')
      expect(reviewElements).toHaveLength(2)
    })
  })

  it('renders first filtered review correctly', async () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } })
    await waitFor(() => {
      const reviewElements = screen.getAllByTestId('review')
      expect(reviewElements[0]).toHaveTextContent('Carol')
    })
  })

  it('renders second filtered review correctly', async () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } })
    await waitFor(() => {
      const reviewElements = screen.getAllByTestId('review')
      expect(reviewElements[1]).toHaveTextContent('Alice')
    })
  })

  it('displays no reviews message when no reviews match filter', async () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '0' } })
    await waitFor(() => {
      expect(screen.getByText(/No reviews found/i)).toBeInTheDocument()
    })
  })

  it('disables reverse order when checkbox is checked', async () => {
    fireEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      const reviewElements = screen.getAllByTestId('review')
      expect(reviewElements[0]).toHaveTextContent('Alice')
    })
  })
})
