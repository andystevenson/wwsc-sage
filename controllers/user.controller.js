import { api } from '../config/env.js'
import { getToken } from './auth.controller.js'
import { GET } from './GET.js'

export const getUserX = async () => {
  // if the current user has been fetched return it
  if (user) return user

  // we need to fetch hopefully installed user

  const token = await getToken()
  if (!token) return null

  const url = `${api}/user`

  const headers = {
    Authorization: `Bearer ${token.access_token}`,
    'Content-Type': 'application/json',
  }

  const response = await fetch(url, { headers })
  user = await response.json()
  return user
}

export const getUserData = GET('user')

let user = null
export const getUser = async () => {
  // if we already have a user then return that
  if (user) return user

  user = await getUserData()
  return user
}
