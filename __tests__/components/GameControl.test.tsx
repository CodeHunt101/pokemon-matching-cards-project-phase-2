import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { reviewsApi } from '../../src/api/services'
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest'
import GameControl from '../../src/Components/GameControl'
vi.mock('../../src/api/services', () => ({
  reviewsApi: {
    createReview: vi.fn(),
    getReviews: vi.fn(),
  },
}))

describe('GameControl component', () => {
  const defaultProps = {
    moves: 10, // so Math.floor(moves / 2) equals 5
    // When all cards are open the modal should appear.
    isCardOpen: [true, true, true],
    restartGame: vi.fn(),
    handleGameDifficulty: vi.fn(),
    deckSize: 20, // will map to "Medium" using our getDifficultyLevel function
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not show the modal if not all cards are open', () => {
    render(<GameControl {...defaultProps} isCardOpen={[true, false, true]} />)
    expect(screen.queryByText(/Congratulations!/i)).not.toBeInTheDocument()
  })

  it('shows the modal when all cards are open', () => {
    render(<GameControl {...defaultProps} />)
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Would you like to save your results and rate us\?/i)
    ).toBeInTheDocument()
  })

  it('displays the review form when clicking the "Yes" button', () => {
    render(<GameControl {...defaultProps} />)
    const yesButton = screen.getByRole('button', { name: /yes/i })
    fireEvent.click(yesButton)

    expect(screen.getByPlaceholderText(/Enter first name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter last name/i)).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', { name: /Rate me:/i })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Comments\.\.\./i)).toBeInTheDocument()
  })

  it('submits the review form and resets its fields', async () => {
    const createReviewMock = reviewsApi.createReview as Mock
    const getReviewsMock = reviewsApi.getReviews as Mock
    createReviewMock.mockResolvedValue({ data: { id: 1 }, error: null })
    getReviewsMock.mockResolvedValue({ data: [], error: null })

    render(<GameControl {...defaultProps} />)

    const yesButton = screen.getByRole('button', { name: /yes/i })
    fireEvent.click(yesButton)

    fireEvent.change(screen.getByPlaceholderText(/Enter first name/i), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Enter last name/i), {
      target: { value: 'Doe' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: /Rate me:/i }), {
      target: { value: '5' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Comments\.\.\./i), {
      target: { value: 'Great game!' },
    })

    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(createReviewMock).toHaveBeenCalledTimes(1)
      expect(getReviewsMock).toHaveBeenCalledTimes(1)
    })

    expect(screen.queryByText(/Congratulations!/i)).not.toBeInTheDocument()

    const restartIcon = screen.getByTestId('restart-icon')
    fireEvent.click(restartIcon)

    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /yes/i }))

    expect(screen.getByPlaceholderText(/Enter first name/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Enter last name/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/Comments\.\.\./i)).toHaveValue('')
  })

  it('closes the modal when clicking the "No" button', () => {
    render(<GameControl {...defaultProps} />)
    const noButton = screen.getByRole('button', { name: /no/i })
    fireEvent.click(noButton)
    expect(screen.queryByText(/Congratulations!/i)).not.toBeInTheDocument()
  })
})
