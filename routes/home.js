import { Router } from 'express'
import { pages } from '../config/pages.js'

const router = Router()

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(pages.index)
})

router.get('/hello', (req, res) => {
  res.sendFile(pages.hello)
})

router.get('/home', (req, res) => {
  res.status(301).redirect('/')
})

export default router
