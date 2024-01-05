import { Router } from 'express'
import { pages } from '../config/pages.js'

const router = Router()

router.get('/', (req, res) => {
  res.sendFile(pages.closures)
})

export default router
