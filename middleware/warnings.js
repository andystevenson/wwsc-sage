import pino from 'pino'
import files from '../config/files.js'

const transport = pino.transport({
  targets: [
    {
      level: 'warn',
      target: 'pino/file',
      options: {
        destination: files.logs.warnings,
      },
    },
  ],
})

const logger = pino(transport)

const warnings = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  logger.error(`${err.name}: ${err.message}`)
  res.status(500).send(err.message)
}

export default warnings
