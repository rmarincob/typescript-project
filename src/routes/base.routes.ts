import { Router } from 'express'

import { verifyToken } from '../middlewares/jwt'
import authRoutes from './auth.routes'
import userRoutes from './users.routes'

const router = Router()
router.use('/api/auth', authRoutes)
router.use('/api/users', (verifyToken) as any, userRoutes)

export default router
