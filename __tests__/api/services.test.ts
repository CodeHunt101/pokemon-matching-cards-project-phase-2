import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest'
import { reviewsApi, contactApi, pokemonApi } from '../../src/api/services'

vi.mock('../../src/api/config', () => ({
  API_JSON_SERVER_URL: 'http://localhost:3000',
}))

describe('reviewsApi', () => {
  beforeEach(() => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    global.fetch = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getReviews fetches reviews correctly', async () => {
    const fakeReviews = [
      {
        firstName: 'John',
        lastName: 'Doe',
        rating: 5,
        comments: 'Great!',
        gameDifficulty: 'hard',
        moves: 10,
        datePosted: 123456789,
      },
    ]
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeReviews),
    })
    const result = await reviewsApi.getReviews()
    expect(result).toEqual({ data: fakeReviews, error: null })
  })

  it('createReview sends a POST request correctly', async () => {
    const reviewInput = {
      firstName: 'Jane',
      lastName: 'Smith',
      rating: 4,
      comments: 'Good',
      gameDifficulty: 'medium',
      moves: 15,
    }
    const now = 1234567890
    vi.spyOn(Date, 'now').mockReturnValue(now)
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ...reviewInput, datePosted: now }),
    })
    const result = await reviewsApi.createReview(reviewInput)
    expect(result).toEqual({
      data: { ...reviewInput, datePosted: now },
      error: null,
    })
  })
})

describe('contactApi', () => {
  beforeEach(() => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    global.fetch = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submitContact sends a POST request correctly', async () => {
    const contactForm = {
      firstName: 'Alice',
      lastName: 'Wonder',
      email: 'alice@example.com',
      phone: '123456789',
      message: 'Hello!',
    }
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    })
    const result = await contactApi.submitContact(contactForm)
    expect(result).toEqual({ data: { success: true }, error: null })
  })
})

describe('pokemonApi', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getPokemonSprite returns sprite URL on success', async () => {
    const pokeId = 1
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: vi
        .fn()
        .mockResolvedValue({
          sprites: {
            other: { dream_world: { front_default: 'http://sprite.url' } },
          },
        }),
    })
    const result = await pokemonApi.getPokemonSprite(pokeId)
    expect(result).toBe('http://sprite.url')
  })

  it('getPokemonSprite returns null if sprite is not found', async () => {
    const pokeId = 2
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: vi
        .fn()
        .mockResolvedValue({
          sprites: { other: { dream_world: { front_default: null } } },
        }),
    })
    const result = await pokemonApi.getPokemonSprite(pokeId)
    expect(result).toBeNull()
  })

  it('getPokemonSprite returns null on non-ok response', async () => {
    const pokeId = 3
    ;(global.fetch as unknown as Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
      json: vi.fn(),
    })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = await pokemonApi.getPokemonSprite(pokeId)
    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('getPokemonSprite returns null on fetch exception', async () => {
    const pokeId = 4
    ;(global.fetch as unknown as Mock).mockRejectedValue(
      new Error('Network error')
    )
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = await pokemonApi.getPokemonSprite(pokeId)
    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
