import express from 'express'
import {
  currentExamSession,
  getAttempt,
  getExams,
  nextQuestion,
  startExam,
  submitExam,
} from '../controllers/student.controllers.js'

const studentRouter = express.Router()

studentRouter.post('/exam/start', startExam)
studentRouter.post('/exam/next/:examId', nextQuestion)
studentRouter.get('/exam/submit/:examId', submitExam)
studentRouter.get('/exams', getExams)
studentRouter.get('/exams/:examId', currentExamSession)
studentRouter.get('/attempt/:attemptId', getAttempt)

export default studentRouter
