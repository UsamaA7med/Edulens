import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import type { NextFunction, Request, Response } from 'express'
import type GenerateError from './utils/generateError.js'
import { connectToMongoDB } from './database/connectToMongoDB.js'
import authRouter from './routes/auth.routes.js'
import questionRouter from './routes/question.routes.js'
import teacherProtectedMiddleware from './middleware/teacherProtected.middleware.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello osama!')
})

app.use('/api/auth', authRouter)
app.use('/api/teacher/question', teacherProtectedMiddleware, questionRouter)

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
