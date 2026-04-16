import express from 'express'
import {
  createExam,
  exportCSVData,
  teacherAttempts,
  teacherExams,
} from '../controllers/exam.controllers.js'

const examRouter = express.Router()

examRouter.post('/', createExam)
examRouter.get('/', teacherExams)
examRouter.get('/attempts', teacherAttempts)
examRouter.get('/export-csv', exportCSVData)

export default examRouter
