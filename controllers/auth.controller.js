import * as env from '../config/env.js'
import bcrypt from 'bcrypt'

const salt = await bcrypt.genSalt()

// store all the live sessions
const sessions = {}

// TODO: go in a server
let accessToken = null

const headers = {
  method: 'POST',
  'Content-Type': 'application/x-www-form-urlencoded',
  Allow: 'application/json',
}

export const getToken = async (code = null) => {
  // if we have a live token, use it
  // but if we have a new code... then get a new token

  if (accessToken && !code) {
    console.log('returning cached token')
    return accessToken
  }

  // otherwise we have to ask for a new token

  if (!code) return console.log(`must supply a code to get a new token`)

  const { client_id, client_secret, grant_type, redirect_uri, accessTokenUrl } =
    env

  const params = new URLSearchParams({
    client_id,
    client_secret,
    code,
    grant_type,
    redirect_uri,
  })

  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers,
    body: `${params}`,
  })

  const json = await response.json()
  console.log('getToken', json)

  accessToken = json
  return accessToken
}

export const refreshToken = async (session) => {
  const { client_id, client_secret, accessTokenUrl } = env
  const grant_type = `refresh_token`
  const refresh_token = session.token.refresh_token

  const params = new URLSearchParams({
    client_id,
    client_secret,
    grant_type,
    refresh_token,
  })

  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers,
    body: `${params}`,
  })

  const newToken = await response.json()
  console.log(
    'refreshToken',
    newToken.access_token,
    'original',
    session.token.access_token,
  )

  session.token = newToken
  return session
}

export const revokeToken = async () => {
  if (!accessToken) {
    console.error(`cannot revoke refresh token`)
    return
  }

  const { client_id, client_secret, revokeTokenUrl } = env
  const token = accessToken.refresh_token

  const params = new URLSearchParams({
    client_id,
    client_secret,
    token,
  })

  const response = await fetch(revokeTokenUrl, {
    method: 'POST',
    headers,
    body: `${params}`,
  })

  const success = await response.json()
  console.log('revokeToken', success)

  accessToken = null
  return
}

const scheduleRefresh = (session) => {
  // schedule the token refresh 90% of the way through its elapsed time (which is in seconds)
  const time = Math.floor(session.token.expires_in) * 10
  console.log(`schedule refresh in ${time}`)
  // const time = Math.floor(session.token.expires_in) * 1000
  setTimeout(async () => {
    const { code, country, state, token } = await refreshToken(session)
    await saveSession(code, country, state, token)
  }, time)
}

export const saveSession = async (code, country, state, token) => {
  const hash = await bcrypt.hash(code, salt)
  sessions[hash] = {
    from: hash,
    code,
    country,
    state,
    token,
  }

  console.log('saveSession', sessions)

  sessionStorage.setItem('session', hash)
  sessionStorage.setItem('country', country)

  // refresh access token...
  scheduleRefresh(sessions[hash])

  return sessions[hash]
}
