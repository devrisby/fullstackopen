import express from 'express'
import { mongoHealth } from '../data/db'
import blogRouter from '../modules/blogs/blogController'
import userRouter from '../modules/users/userController'
import authRouter from '../modules/auth/auth.controller'


const router = express.Router()

router.get('/api/health', async (req, res) => {
  const dbHealth = await mongoHealth()
  const appHealth = {
    status: 'OK',
    uptime: `${process.uptime().toFixed(2)} seconds`,
    database: dbHealth,
    date: new Date().toLocaleString(),
  }

  res.status(200).json(appHealth)
})

router.use('/api/blogs', blogRouter);
router.use('/api/users', userRouter)
router.use('/api/auth', authRouter)

export default router