import type { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/async.middleware.js'
import {
  createQuestionSchema,
  updateQuestionSchema,
} from '../validations/question.validation.js'
import GenerateError from '../utils/generateError.js'
import {
  cloudinaryDeleteImage,
  cloudinaryUploadImage,
} from '../cloudinary/cloudinary.js'
import QuestionModel from '../models/question.model.js'
import OptionModel from '../models/option.model.js'
import ExamModel from '../models/exam.model.js'
import FormModel from '../models/form.model.js'
import mongoose from 'mongoose'
import AttemptModel from '../models/attempt.model.js'

export const createQuestion = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const isValidBody = createQuestionSchema.safeParse(req.body)
    if (!isValidBody.success) {
      return next(new GenerateError('Invalid body', 400, 'error'))
    }
    const { question, options, difficulty } = isValidBody.data
    const teacher = req.user?.id as string
    const createdOptions = await OptionModel.insertMany(options)
    const optionsIds = createdOptions.map((option) => option._id)
    if (req.body.image) {
      const image = req.body.image
      const { url, public_id } = await cloudinaryUploadImage(image)
      await QuestionModel.create({
        question,
        options: optionsIds,
        teacher,
        difficulty,
        image: {
          url,
          public_id,
        },
      })
      const teacherQuestions = await QuestionModel.find({
        teacher,
      }).populate('options')

      res.status(201).json({
        status: 'success',
        message: 'Question created successfully',
        data: teacherQuestions,
      })
    } else {
      await QuestionModel.create({
        question,
        options: optionsIds,
        difficulty,
        teacher,
      })
      const teacherQuestions = await QuestionModel.find({
        teacher,
      }).populate('options')
      res.status(201).json({
        status: 'success',
        message: 'Question created successfully',
        data: teacherQuestions,
      })
    }
  }
)

export const deleteQuestion = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const question = await QuestionModel.findById(id)
    if (!question) {
      return next(new GenerateError('Question not found', 404, 'error'))
    }
    if (question.teacher.toString() !== req.user?.id) {
      return next(new GenerateError('Unauthorized', 401, 'error'))
    }
    if (question.image && question.image.public_id) {
      await cloudinaryDeleteImage(question.image.public_id)
    }
    await OptionModel.deleteMany({ _id: { $in: question.options } })
    await FormModel.updateMany(
      { questions: { $in: [question._id] } },
      { $pull: { questions: question._id } }
    )
    await QuestionModel.findByIdAndDelete(id)
    const teacherQuestions = await QuestionModel.find({
      teacher: req.user?.id,
    }).populate('options')
    res.status(200).json({
      status: 'success',
      message: 'Question deleted successfully',
      data: teacherQuestions,
    })
  }
)

export const teacherQuestions = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const questions = await QuestionModel.find({
      teacher: req.user?.id as string,
    }).populate('options')
    res.status(200).json({
      status: 'success',
      data: questions,
    })
  }
)

export const updateQuestion = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const isValidBody = updateQuestionSchema.safeParse(req.body)
    if (!isValidBody.success) {
      return next(new GenerateError('Invalid body', 400, 'error'))
    }
    const { question, options, difficulty } = isValidBody.data
    const existingQuestion = await QuestionModel.findById(id)
    if (!existingQuestion) {
      return next(new GenerateError('Question not found', 404, 'error'))
    }
    const updatedOptions = await OptionModel.updateMany(
      { _id: { $in: existingQuestion.options } },
      { $set: { option: options } }
    )
    if (req.body.image) {
      if (existingQuestion.image && existingQuestion.image.public_id) {
        await cloudinaryDeleteImage(existingQuestion.image.public_id)
      }
      const image = req.body.image
      const { url, public_id } = await cloudinaryUploadImage(image)
      existingQuestion.image = {
        url,
        public_id,
      }
    }
    if (question) existingQuestion.question = question
    if (difficulty) existingQuestion.difficulty = difficulty
    await existingQuestion.save()
    const teacherQuestions = await QuestionModel.find({
      teacher: req.user?.id as string,
    }).populate('options')
    res.status(200).json({
      status: 'success',
      message: 'Question updated successfully',
      data: teacherQuestions,
    })
  }
)

export const analytics = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.user?.id as string
    const totalStudents = await AttemptModel.countDocuments({
      teacher: new mongoose.Types.ObjectId(teacherId),
    })
    const TeacherAverageTime = await AttemptModel.aggregate([
      {
        $match: {
          teacher: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $group: {
          _id: null,
          averageTime: { $avg: '$timeTaken' },
        },
      },
    ])
    const totalQuestions = await QuestionModel.countDocuments({
      teacher: new mongoose.Types.ObjectId(teacherId),
    })
    const questionAnalytics = await QuestionModel.aggregate([
      {
        $match: {
          teacher: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
        },
      },
    ])
    const numberOfExams = await ExamModel.aggregate([
      {
        $match: {
          teacher: new mongoose.Types.ObjectId(teacherId),
        },
      },
    ])
    const analytics = {
      questionAnalytics: {
        easy: questionAnalytics.find((item) => item._id === 'easy')?.count || 0,
        medium:
          questionAnalytics.find((item) => item._id === 'medium')?.count || 0,
        hard: questionAnalytics.find((item) => item._id === 'hard')?.count || 0,
      },
      numberOfExams: numberOfExams.length,
      totalQuestions,
      totalStudents,
      averageTime: TeacherAverageTime[0]?.averageTime || 0,
    }
    res.status(200).json({
      status: 'success',
      data: analytics,
    })
  }
)
