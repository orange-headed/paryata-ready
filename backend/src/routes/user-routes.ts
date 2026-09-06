import { Router } from 'express'
import {
  readUser,
  writeUser,
} from '../controllers/user-controller'

export const userRouter = Router()

userRouter.get('/:id', readUser)
userRouter.post('/', writeUser)
