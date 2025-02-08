import { ContactForm, Review } from '../types/types'
import { apiCall } from './helpers'

export const reviewsApi = {
  
  getReviews: () => apiCall<Review[]>('/reviews'),

  /**
   * Submits a review to the server.
   * @param review The review data to submit. `datePosted` will be set to the current time.
   * @returns The newly created review.
   */
  createReview: (review: Omit<Review, 'datePosted'>) =>
    apiCall<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...review, datePosted: Date.now() }),
    }),
}

export const contactApi = {
/**
 * Submits contact form data to the server.
 * @param contactForm The contact form data to submit.
 * @returns A promise that resolves when the contact form is successfully submitted,
 * or rejects with an error message if the submission fails.
 */

  submitContact: (contactForm: ContactForm) =>
    apiCall<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactForm),
    }),
}

export const pokemonApi = {
  /**
   * Fetches the sprite image URL for a given Pokemon ID.
   * @param pokeId The Pokemon ID to fetch.
   * @returns The sprite image URL if the Pokemon is found, or null if the Pokemon is not found.
   */
  getPokemonSprite: async (pokeId: number): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeId}`
      )
      if (!response.ok) throw new Error('Pokemon not found')
      const data = await response.json()
      return data?.sprites?.other?.dream_world?.front_default || null
    } catch (error) {
      console.error(`Error fetching Pokemon ${pokeId}:`, error)
      return null
    }
  },
}
