import { api } from '../config/env.js'
import { getToken } from './auth.controller.js'

// GET is a high-order-function that returns a simple get request at single endpoint
// it is a common pattern in the SAGE api

export const GET = (endpoint) => {
  return async function get() {
    const token = await getToken()
    if (!token) return null

    const url = `${api}/${endpoint}`

    const headers = {
      Authorization: `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
    }

    const response = await fetch(url, { headers })
    const data = await response.json()
    return data
  }
}
