import express from 'express'
import upload from '../multer/multer.js'
import {
  analytics,
  createQuestion,
  deleteQuestion,
  teacherQuestions,
  updateQuestion,
} from '../controllers/question.controllers.js'

const questionRouter = express.Router()

questionRouter.post('/', upload.single('image'), createQuestion)

questionRouter.delete('/:id', deleteQuestion)

questionRouter.get('/', teacherQuestions)

questionRouter.patch('/:id', upload.single('image'), updateQuestion)

questionRouter.get('/analytics', analytics)

export default questionRouter
