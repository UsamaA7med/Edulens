import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { NextFunction, Request, Response } from 'express'
import type GenerateError from './utils/generateError.js'
import { connectToMongoDB } from './database/connectToMongoDB.js'
import authRouter from './routes/auth.routes.js'
import questionRouter from './routes/question.routes.js'
import teacherProtectedMiddleware from './middleware/teacherProtected.middleware.js'
import examRouter from './routes/exam.routes.js'
import redis from './lib/upstachRedis.js'
import studentProtectedMiddleware from './middleware/studentProtected.middleware.js'
import studentRouter from './routes/student.routes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/teacher/question', teacherProtectedMiddleware, questionRouter)
app.use('/api/teacher/exam', teacherProtectedMiddleware, examRouter)
app.use('/api/student', studentProtectedMiddleware, studentRouter)

app.use(
  (err: GenerateError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    })
  }
)

const startServer = async () => {
  try {
    await connectToMongoDB()
    app.listen(process.env.PORT_NUMBER, () => {
      console.log(`Server is running on port ${process.env.PORT_NUMBER}`)
    })
  } catch (error) {
    console.log('Error starting server', error)
  }
}

startServer()
