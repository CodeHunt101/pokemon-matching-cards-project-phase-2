import React from 'react'
import { render } from '@testing-library/react'
import shuffleArray, {
  getPokemonIdFromImgUrl,
  generateStars,
} from '../src/Helpers'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'

describe('Helpers.tsx', () => {
  describe('shuffleArray', () => {
    it('returns a permutation of the original array', () => {
      const original = [1, 2, 3, 4, 5]
      vi.spyOn(Math, 'random').mockReturnValue(0.5)
      const shuffled = shuffleArray([...original])
      expect(shuffled.sort()).toEqual(original.sort())
      ;(Math.random as any).mockRestore()
    })
  })

  describe('getPokemonIdFromImgUrl', () => {
    it('returns the id when the target has class "card"', () => {
      const img = document.createElement('img')
      img.src = 'http://example.com/pokemon/123.png'

      const fakeTarget = document.createElement('div')
      fakeTarget.className = 'card'
      fakeTarget.appendChild(img)

      const fakeEvent = {
        target: fakeTarget,
      } as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>

      const id = getPokemonIdFromImgUrl(fakeEvent)
      expect(id).toBe(123)
    })

    it('returns the id when the target is an image element', () => {
      const img = document.createElement('img')
      img.src = 'http://example.com/pokemon/456.png'

      const fakeEvent = {
        target: img,
      } as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>

      const id = getPokemonIdFromImgUrl(fakeEvent)
      expect(id).toBe(456)
    })
  })

  describe('generateStars', () => {
    it('returns a StarsMap with keys for 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, and 5', () => {
      const starsMap = generateStars('test-class')

      const expectedKeys = [
        '0',
        '0.5',
        '1',
        '1.5',
        '2',
        '2.5',
        '3',
        '3.5',
        '4',
        '4.5',
        '5',
      ]
      expectedKeys.forEach((key) => {
        expect(Object.keys(starsMap)).toContain(key)
      })
    })

    it('creates the correct number of stars for key "0"', () => {
      const starsMap = generateStars()
      expect(starsMap[0]).toHaveLength(5)
    })

    it('creates the correct number of stars for key "5"', () => {
      const starsMap = generateStars()
      expect(starsMap[5]).toHaveLength(5)
    })

    it('renders JSX elements with the provided className', () => {
      const starsMap = generateStars('my-star')
      const { container } = render(<>{starsMap[1]}</>)
      const starElement = container.querySelector('.my-star')
      expect(starElement).toBeInTheDocument()
    })
  })
})
