import pino from 'pino'
import logger from 'pino-http'
import files from '../config/files.js'

const transport = pino.transport({
  targets: [
    {
      level: 'info',
      target: 'pino/file',
      options: {
        destination: files.logs.http,
      },
    },
  ],
})

export default logger({ logger: pino(transport) })
