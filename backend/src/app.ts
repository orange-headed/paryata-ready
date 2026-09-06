import cors from 'cors'
import express, {
  type ErrorRequestHandler,
} from 'express'
import { userRouter } from './routes/user-routes'

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

export const app = express()

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    success: true,
    message: 'Paryata backend is running',
  })
})

app.use('/api/users', userRouter)

const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  const statusCode =
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number'
      ? error.statusCode
      : 500

  if (statusCode >= 500) {
    console.error(error)
  }

  response.status(statusCode).json({
    success: false,
    error:
      statusCode === 400
        ? 'Invalid JSON request body'
        : 'Internal server error',
  })
}

app.use(errorHandler)
