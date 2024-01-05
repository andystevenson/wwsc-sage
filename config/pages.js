import { info } from 'node:console'
import * as url from 'url'
import path from 'node:path'

// const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
export const pages = {
  index: path.join(__dirname, '..', 'pages', 'index.html'),
  hello: path.join(__dirname, '..', 'pages', 'hello.html'),
  closures: path.join(__dirname, '..', 'pages', 'closures.html'),
  404: path.join(__dirname, '..', 'pages', '404.html'),
  public: path.join(__dirname, '..', 'public'),
}
