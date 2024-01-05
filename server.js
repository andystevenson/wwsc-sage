import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import corsConfig from './config/cors.js'
import { pages } from './config/pages.js'
import logger from './middleware/logger.js'
import warnings from './middleware/warnings.js'
import * as env from './config/env.js'
import home from './routes/home.js'
import auth from './routes/auth.js'
import user from './routes/user.js'
import closures from './routes/closures.js'

import { info, error } from 'node:console'

const app = express()

// enable logging
app.use(logger)

// log any warnings or worse
app.use(warnings)

// configure cors
app.use(cors(corsConfig))

// allow urlencoded requests. e.g. form data
// content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// allow JSON data
app.use(express.json())

// static files
app.use(express.static('public'))

// routes

app.use('/', home)
app.use('/auth', auth)
app.use('/user', user)
app.use('/closures', closures)

app.all('*', (req, res) => {
  res.status(404).sendFile(pages['404'])
})

app.listen(env.PORT, () => {
  info('listening on port', env.PORT)
})
