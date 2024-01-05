import { info } from 'node:console'
import * as url from 'url'
import path from 'node:path'

// const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const files = {
  logs: {
    http: path.join(__dirname, '..', 'logs', 'access.log'),
    warnings: path.join(__dirname, '..', 'logs', 'warnings.log'),
  },
  db: {
    employees: path.join(__dirname, '..', 'model', 'employees.json'),
  },
}

export default files
