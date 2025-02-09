import { apiCall } from '../../src/api/helpers'
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest'

vi.mock('../../src/api/config', () => ({
  API_JSON_SERVER_URL: 'http://localhost:3000',
}))

describe('apiCall', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls fetch with correct URL and headers', async () => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    const fakeResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ result: 'ok' }),
    }
    ;(global.fetch as unknown as Mock).mockResolvedValue(fakeResponse)

    await apiCall('/success')
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/success',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('returns data when fetch is successful', async () => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    const fakeData = { result: 'ok' }
    const fakeResponse = { ok: true, json: vi.fn().mockResolvedValue(fakeData) }
    ;(global.fetch as unknown as Mock).mockResolvedValue(fakeResponse)

    const result = await apiCall('/success')
    expect(result).toEqual({ data: fakeData, error: null })
  })

  it('returns an error when response is not ok', async () => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    const fakeResponse = {
      ok: false,
      statusText: 'Bad Request',
      status: 400,
      json: vi.fn(),
    }
    ;(global.fetch as unknown as Mock).mockResolvedValue(fakeResponse)

    const result = await apiCall('/fail')
    expect(result).toEqual({ data: null, error: 'API Error: Bad Request' })
  })

  it('returns an unexpected error on fetch exception', async () => {
    Object.defineProperty(import.meta, 'env', {
      value: { MODE: 'test' },
      writable: true,
    })
    ;(global.fetch as unknown as Mock).mockRejectedValue(
      new Error('Network error')
    )

    const result = await apiCall('/exception')
    expect(result).toEqual({
      data: null,
      error: 'An unexpected error occurred',
    })
  })
})
