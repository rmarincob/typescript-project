import { Router } from 'express'

import { signIn, whoami } from '../controllers/auth.controller'
import { verifyToken } from '../middlewares/jwt'
import { verifySession } from '../middlewares/session'

const router = Router()
router.post('/sign-in', (verifySession) as any, (signIn) as any)
router.get('/whoami', (verifyToken) as any, (whoami) as any)

export default router
