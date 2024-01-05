import { Router } from 'express'
import { getUser } from '../controllers/user.controller.js'

const router = Router()

router.get('/', async (req, res) => {
  const user = await getUser()
  if (!user) return res.status(400).send({ message: 'user not logged in' })
  res.status(200).send(user)
})

export default router
