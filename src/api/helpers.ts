import { ApiResponse } from '../types/types'
import { API_JSON_SERVER_URL } from './config'

// Error handling
export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

// Helper function for API calls
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_JSON_SERVER_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(`API Error: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    if (error instanceof ApiError) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'An unexpected error occurred' }
  }
}
