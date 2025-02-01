import { JSX } from 'react'

export type Review = {
  firstName: string
  lastName: string
  rating: number
  comments: string
  gameDifficulty: string
  moves: number
  datePosted: number
}

export type ContactForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export type PokemonSprite = {
  other: {
    dream_world: {
      front_default: string
    }
  }
}

export type StarsKey = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
export type StarsMap = Record<StarsKey, JSX.Element[]>
