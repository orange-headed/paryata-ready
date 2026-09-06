import type { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { z } from 'zod'
import {
  createUser,
  getUserById,
} from '../services/user-service'

const createUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('A valid email is required').transform((value) => value.toLowerCase()),
})

export async function readUser(
  request: Request,
  response: Response,
) {
  const userId = request.params.id

  if (typeof userId !== 'string') {
    response.status(400).json({
      success: false,
      error: 'Invalid user id',
    })
    return
  }

  const user = await getUserById(userId)

  if (!user) {
    response.status(404).json({
      success: false,
      error: 'User not found',
    })
    return
  }

  response.json({
    success: true,
    data: user,
  })
}

export async function writeUser(
  request: Request,
  response: Response,
) {
  const result = createUserSchema.safeParse(request.body)

  if (!result.success) {
    response.status(400).json({
      success: false,
      error: result.error.issues[0]?.message ?? 'Invalid request body',
    })
    return
  }

  try {
    const user = await createUser(result.data)

    response.status(201).json({
      success: true,
      data: user,
    })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      response.status(409).json({
        success: false,
        error: 'A user with that email already exists',
      })
      return
    }

    throw error
  }
}
