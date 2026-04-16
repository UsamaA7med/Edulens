import type { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/async.middleware.js'
import redis from '../lib/upstachRedis.js'
import ExamModel from '../models/exam.model.js'
import GenerateError from '../utils/generateError.js'
import FormModel from '../models/form.model.js'
import OptionModel from '../models/option.model.js'
import AttemptModel from '../models/attempt.model.js'

type TExam = {
  answers: {
    questionId: string
    answer: string
  }[]
  startTime: number
  endTime: number
  form: {
    questions: {
      question: {
        _id: string
        question: string
        image: {
          url: string
          public_id: string
        }
      }
      options: {
        _id: string
        text: string
        isCorrect: boolean
      }[]
    }[]
    _id: string
  }
}

export const startExam = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.body
    const studentId = req.user?.id
    const exam = await ExamModel.findById(examId)
    if (!exam) {
      return next(new GenerateError('Exam not found', 404, 'error'))
    }
    const examDuration = exam.examDuration
    const randomFormId =
      exam.forms[Math.floor(Math.random() * exam.forms.length)]
    const examKey = `exam:${examId}:student:${studentId}`
    const form = await FormModel.findById(randomFormId)
      .populate({
        path: 'questions.options',
        model: 'Option',
      })
      .populate({
        path: 'questions.question',
        model: 'Question',
        select: 'question image',
      })

    if (!form) {
      return next(new GenerateError('Form not found', 404, 'error'))
    }
    await redis.set(
      examKey,
      {
        answers: [],
        startTime: Date.now(),
        endTime: Date.now() + examDuration * 60 * 1000,
        form,
      },
      {
        ex: examDuration * 60,
      }
    )
    res.status(200).json({
      status: 'success',
      data: form,
      startTime: Date.now(),
      endTime: Date.now() + examDuration * 60 * 1000,
    })
  }
)

export const nextQuestion = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params
    const answers = req.body
    const studentId = req.user?.id
    const examKey = `exam:${examId}:student:${studentId}`
    const data = await redis.get<TExam>(examKey)
    if (!data) {
      return next(new GenerateError('Exam not found', 404, 'error'))
    }
    if (Date.now() > data.endTime) {
      return next(new GenerateError('Time is over', 403, 'error'))
    }
    data.answers = answers
    await redis.set(examKey, data)
    const updatedData = await redis.get<TExam>(examKey)
    if (!updatedData) {
      return next(new GenerateError('Something went wrong', 500, 'error'))
    }
    res.status(200).json({ status: 'success' })
  }
)

export const submitExam = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params
    const studentId = req.user?.id
    const examKey = `exam:${examId}:student:${studentId}`
    const data = await redis.get<TExam>(examKey)
    if (!data) {
      return next(new GenerateError('Exam not found', 404, 'error'))
    }
    if (Date.now() > data.endTime) {
      return next(new GenerateError('Time is over', 403, 'error'))
    }
    const populatedAnswers = await Promise.all(
      data.answers.map(async (answer) => {
        const question = data.form.questions.find(
          (question) => question.question._id === answer.questionId
        )
        const option = question?.options.find(
          (option) => option._id === answer.answer
        )
        return {
          question: answer.questionId,
          answer: option,
        }
      })
    )
    const score = populatedAnswers.reduce((acc, answer) => {
      return acc + (answer.answer?.isCorrect ? 1 : 0)
    }, 0)
    const submitTime = Date.now()
    const diff = submitTime - data.startTime
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    const formatted = `${hours}h ${minutes}m ${seconds}s`
    const status = score >= data.form.questions.length / 2 ? 'passed' : 'failed'
    const teacher = await ExamModel.findById(examId)
    if (!teacher) {
      return next(new GenerateError('Teacher not found', 404, 'error'))
    }
    const attempt = await AttemptModel.create({
      student: studentId!,
      teacher: teacher.teacher,
      answers: populatedAnswers,
      form: data.form._id,
      score,
      timeTaken: formatted,
      status,
      exam: examId as string,
    })
    await redis.del(examKey)
    res.status(200).json({
      status: 'success',
      data: {
        attemptId: attempt._id,
      },
    })
  }
)

export const getExams = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const exams = await ExamModel.find().populate('forms').populate('teacher')
    res.status(200).json({
      status: 'success',
      data: exams,
    })
  }
)

export const currentExamSession = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { examId } = req.params
    const studentId = req.user?.id
    const examKey = `exam:${examId}:student:${studentId}`
    const data = await redis.get<TExam>(examKey)
    if (!data) {
      return next(new GenerateError('Exam not found', 404, 'error'))
    }
    res.status(200).json({
      status: 'success',
      data,
    })
  }
)

export const getAttempt = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { attemptId: examId } = req.params
    const attempt = await AttemptModel.findOne({ exam: examId! })
      .populate('teacher')
      .populate('exam')
    if (!attempt) {
      return next(new GenerateError('Attempt not found', 404, 'error'))
    }
    const numberOfQuestions = attempt.answers.length
    res.status(200).json({
      status: 'success',
      data: {
        attempt,
        numberOfQuestions,
      },
    })
  }
)
