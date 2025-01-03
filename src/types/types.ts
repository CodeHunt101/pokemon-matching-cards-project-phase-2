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
