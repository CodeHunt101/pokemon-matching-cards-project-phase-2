import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '../../src/components/Header'
import '@testing-library/jest-dom'
import { beforeAll, describe, expect, it } from 'vitest'

beforeAll(() => {
  Object.defineProperty(import.meta, 'env', {
    value: { BASE_URL: '/' },
    writable: true,
  })
})

describe('Header component', () => {
  it('renders contact link with correct href and text', () => {
    render(<Header />)
    const contactLink = screen.getByRole('link', {
      name: /contact the developer/i,
    })
    expect(contactLink).toBeInTheDocument()
  })

  it('contact link has correct href', () => {
    render(<Header />)
    const contactLink = screen.getByRole('link', {
      name: /contact the developer/i,
    })
    expect(contactLink).toHaveAttribute('href', 'mailto:haroldtm55@gmail.com')
  })

  it('renders logo image with correct alt text', () => {
    render(<Header />)
    const logoImage = screen.getByAltText('The international Pokemon logo')
    expect(logoImage).toBeInTheDocument()
  })

  it('logo image has correct src', () => {
    render(<Header />)
    const logoImage = screen.getByAltText('The international Pokemon logo')
    expect(logoImage).toHaveAttribute('src', '/pokemon-logo.svg')
  })

  it('renders Badge with "Matching Cards" text', () => {
    render(<Header />)
    const badgeText = screen.getByText(/matching cards/i)
    expect(badgeText).toBeInTheDocument()
  })
})
