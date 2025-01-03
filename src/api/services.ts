import { ContactForm, Review } from '../types/types'
import { apiCall } from './helpers'

export const reviewsApi = {
  getReviews: () => apiCall<Review[]>('/reviews'),

  createReview: (review: Omit<Review, 'datePosted'>) =>
    apiCall<Review>('/reviews', {
      method: 'POST',
      body: JSON.stringify({ ...review, datePosted: Date.now() }),
    }),
}

export const contactApi = {
  submitContact: (contactForm: ContactForm) =>
    apiCall<void>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactForm),
    }),
}

export const pokemonApi = {
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
