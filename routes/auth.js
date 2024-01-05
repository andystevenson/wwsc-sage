import { Router } from 'express'
import * as env from '../config/env.js'
import { getToken, saveSession } from '../controllers/auth.controller.js'

const router = Router()

router.get('/callback', async (req, res) => {
  const { code, country, state } = req.query

  if (!code || !country || !state === env.state) {
    return res.status(400).send({ message: 'invalid session' })
  }

  const token = await getToken(code)

  console.log('/callback query', { code, country, state, token })

  const { from } = await saveSession(code, country, state, token)

  const params = new URLSearchParams({ from, country })
  res.redirect(`/hello?${params}`)
})

export default router
