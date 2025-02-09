import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Menu from '../../src/components/Menu' // Adjust this path if needed.
import '@testing-library/jest-dom'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Menu component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    )
  })

  it('renders the Home link with the gamepad icon', () => {
    const links = screen.getAllByRole('link')
    const homeLink = links.find((link) => link.getAttribute('href') === '/')
    expect(homeLink).toBeInTheDocument()

    const icon = homeLink?.querySelector('i.fas.fa-gamepad.fa-3x')
    expect(icon).toBeInTheDocument()
  })

  it('renders the Reviews link with correct text and URL', () => {
    const reviewsLink = screen.getByRole('link', { name: /reviews/i })
    expect(reviewsLink).toHaveAttribute('href', '/reviews')

    const boldElement = reviewsLink.querySelector('b')
    expect(boldElement).toBeInTheDocument()
    expect(boldElement).toHaveTextContent('Reviews')
  })

  it('renders the Contact link with correct text and URL', () => {
    const contactLink = screen.getByRole('link', { name: /contact/i })
    expect(contactLink).toHaveAttribute('href', '/contact')

    const boldElement = contactLink.querySelector('b')
    expect(boldElement).toBeInTheDocument()
    expect(boldElement).toHaveTextContent('Contact')
  })
})
