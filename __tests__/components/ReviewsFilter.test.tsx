import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReviewsFilter from '../../src/components/ReviewsFilter'
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('ReviewsFilter component', () => {
  const handleCheckboxChange = vi.fn()
  const handleStarsFilter = vi.fn()

  beforeEach(() => {
    handleCheckboxChange.mockClear()
    handleStarsFilter.mockClear()
    render(
      <ReviewsFilter
        handleCheckboxChange={handleCheckboxChange}
        handleStarsFilter={handleStarsFilter}
      />
    )
  })

  it('renders a checkbox', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders the correct label for the checkbox', () => {
    const checkboxContainer = screen
      .getByRole('checkbox')
      .closest('.form-check')
    expect(checkboxContainer).toBeInTheDocument()
    expect(checkboxContainer?.querySelector('label')?.textContent).toMatch(
      /sort by oldest review/i
    )
  })

  it('renders a select dropdown', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders correct options in the select dropdown', () => {
    const options = screen.getAllByRole('option')
    expect(options.map((option) => option.getAttribute('value'))).toEqual([
      'All',
      '5',
      '4',
      '3',
      '2',
      '1',
      '0',
    ])
  })

  it('calls handleCheckboxChange when the checkbox is clicked', () => {
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleCheckboxChange).toHaveBeenCalledTimes(1)
  })

  it('calls handleStarsFilter when the select value changes', () => {
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } })
    expect(handleStarsFilter).toHaveBeenCalledTimes(1)
  })
})
