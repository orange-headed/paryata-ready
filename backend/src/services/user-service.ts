import { prisma } from '../lib/prisma'

export function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  })
}

export function createUser(input: { name: string; email: string }) {
  return prisma.user.create({
    data: input,
  })
}
