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
    if (req.file) {
      const image = req.file
      const { url, public_id } = await cloudinaryUploadImage(image)
      const createdQuestion = await QuestionModel.create({
        question,
        options: optionsIds,
        teacher,
        difficulty,
        image: {
          url,
          public_id,
        },
      })

      const populatedQuestion = await QuestionModel.findById(
        createdQuestion._id
      ).populate('options')
      res.status(201).json({
        status: 'success',
        data: populatedQuestion,
      })
    } else {
      const createdQuestion = await QuestionModel.create({
        question,
        options: optionsIds,
        difficulty,
        teacher,
      })
      const populatedQuestion = await QuestionModel.findById(
        createdQuestion._id
      ).populate('options')
      res.status(201).json({
        status: 'success',
        data: populatedQuestion,
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
    options?.forEach(async (option) => {
      await OptionModel.findByIdAndUpdate(option.id, {
        text: option.text,
        isCorrect: option.isCorrect,
      })
    })
    if (req.file) {
      if (existingQuestion.image && existingQuestion.image.public_id) {
        await cloudinaryDeleteImage(existingQuestion.image.public_id)
      }
      const image = req.file
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
