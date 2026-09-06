import 'dotenv/config'
import { app } from './app'
import { prisma } from './lib/prisma'

const port = Number(process.env.PORT ?? 5000)

const server = app.listen(port, () => {
  console.log(`Paryata backend listening on http://localhost:${port}`)
})

async function shutdown() {
  await prisma.$disconnect()
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
