import 'dotenv/config'
import { exit } from 'node:process'
export const PORT = process.env.PORT
export const client_id = process.env.SAGE_CLIENT_ID
export const client_secret = process.env.SAGE_CLIENT_SECRET
export const response_type = process.env.SAGE_RESPONSE_TYPE
export const redirect_uri = process.env.SAGE_REDIRECT_URI
export const state = process.env.SAGE_STATE_SECRET
export const scope = process.env.SAGE_SCOPE
export const country = process.env.SAGE_COUNTRY
export const authUrl = process.env.SAGE_AUTH_URL
export const accessTokenUrl = process.env.SAGE_ACCESS_TOKEN_URL
export const revokeTokenUrl = process.env.SAGE_REVOKE_TOKEN_URL
export const api = process.env.SAGE_API

if (
  !PORT ||
  !client_id ||
  !response_type ||
  !redirect_uri ||
  !scope ||
  !state ||
  !country
) {
  console.error('SAGE env not set correctly!')
  exit(1)
}

export const params = new URLSearchParams({
  client_id,
  response_type,
  redirect_uri,
  scope,
  state,
  country,
})

export const authRequestUrl = `${authUrl}&${params}`

export const headers = {
  method: 'GET',
  'Content-Type': 'application/x-www-form-urlencoded',
  Allow: 'application/json',
  redirect: 'follow',
}

export const grant_type = `authorization_code`
