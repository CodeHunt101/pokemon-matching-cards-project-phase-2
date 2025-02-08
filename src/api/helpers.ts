import { ApiResponse } from '../types/types'
import { API_JSON_SERVER_URL } from './config'

const errorMessage =
  'Please clone the repo and run both npm i and npm start to experience the reviews and contact form features.'

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Makes a call to the JSON server API at the specified endpoint.
 *
 * If the app is running in production mode, it will alert the user with a message about how to run the app in development mode.
 *
 * If the response status is not ok, it will throw an ApiError with the status text as the error message.
 *
 * If the response is ok, it will return a promise that resolves to an ApiResponse with the data from the response and null as the error.
 *
 * If there is an unexpected error, it will return a promise that resolves to an ApiResponse with null as the data and 'An unexpected error occurred' as the error.
 * @param endpoint The API endpoint to call
 * @param options Options to pass to fetch
 * @returns A promise that resolves to an ApiResponse
 */
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    if (import.meta.env.MODE === 'production') {
      alert(errorMessage)
      return { data: null, error: errorMessage }
    }
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
