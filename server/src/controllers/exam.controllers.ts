import type { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/async.middleware.js'
import { createExamSchema } from '../validations/exam.validation.js'
import GenerateError from '../utils/generateError.js'
import FormModel from '../models/form.model.js'
import ExamModel from '../models/exam.model.js'
import QuestionModel from '../models/question.model.js'
import { generateShuffledForms } from '../utils/shuffleArray.js'
import AttemptModel from '../models/attempt.model.js'
import { Parser } from 'json2csv'

export const createExam = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const isValidBody = createExamSchema.safeParse(req.body)
    if (!isValidBody.success) {
      return next(new GenerateError('Invalid body', 400, 'error'))
    }
    const { examDuration, questions, examTitle } = isValidBody.data
    const populatedQuestions = await QuestionModel.find({
      _id: { $in: questions },
    })
    const formData = populatedQuestions.map((q) => {
      return {
        question: q._id,
        options: q.options,
      }
    })
    const shuffeldForms = generateShuffledForms(formData)
    const createdForms = await FormModel.insertMany(shuffeldForms)
    await ExamModel.create({
      examTitle,
      teacher: req.user?.id as string,
      forms: createdForms.map((form) => form._id),
      examDuration,
    })
    const teacherExams = await ExamModel.find({
      teacher: req.user?.id as string,
    })
      .populate('forms')
      .populate({
        path: 'forms',
        populate: {
          path: 'questions.options',
          model: 'Option',
        },
      })
      .populate({
        path: 'forms',
        populate: {
          path: 'questions.question',
          model: 'Question',
          select: 'question',
        },
      })
    res.status(201).json({
      status: 'success',
      message: 'Exam created successfully',
      data: teacherExams,
    })
  }
)

export const teacherExams = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherExams = await ExamModel.find({
      teacher: req.user?.id as string,
    })
      .populate('forms')
      .populate({
        path: 'forms',
        populate: {
          path: 'questions.options',
          model: 'Option',
        },
      })
      .populate({
        path: 'forms',
        populate: {
          path: 'questions.question',
          model: 'Question',
          select: 'question',
        },
      })
    res.status(200).json({
      status: 'success',
      message: 'Exams fetched successfully',
      data: teacherExams,
    })
  }
)

export const teacherAttempts = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherAttempts = await AttemptModel.find({
        teacher: req.user?.id!,
      })
        .populate('student')
        .populate('exam')
      res.status(200).json({
        status: 'success',
        message: 'Attempts fetched successfully',
        data: teacherAttempts,
      })
    } catch (error) {
      return next(new GenerateError('Something went wrong', 500, 'error'))
    }
  }
)

export const exportCSVData = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teacherExams = await AttemptModel.find({
        teacher: req.user?.id as string,
      })
        .populate('exam')
        .populate('student')
        .lean()
      const fields = [
        { label: 'Student Name', value: 'student.fullName' },
        { label: 'Exam', value: 'exam.examTitle' },
        { label: 'Score', value: 'score' },
        { label: 'Time Taken', value: 'timeTaken' },
        { label: 'Status', value: 'status' },
      ]
      const parser = new Parser({ fields })
      const csv = parser.parse(teacherExams)
      res.header('Content-Type', 'text/csv')
      res.attachment('exams-report.csv')
      res.send(csv)
    } catch (error) {
      return next(new GenerateError('Something went wrong', 500, 'error'))
    }
  }
)
