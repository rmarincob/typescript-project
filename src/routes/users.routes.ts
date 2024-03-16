import { Router } from 'express'

import { createUser, destroyUser, getUsers, showUser, updateUser } from '../controllers/users.controller'

const router = Router()
router.get('/', (getUsers) as any)
router.get('/:id', (showUser) as any)
router.post('/', (createUser) as any)
router.patch('/:id', (updateUser) as any)
router.delete('/:id', (destroyUser) as any)

export default router
