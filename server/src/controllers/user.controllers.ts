import type { NextFunction, Request, Response } from 'express'
import { asyncMiddleware } from '../middleware/async.middleware.js'
import GenerateError from '../utils/generateError.js'
import bcrypt from 'bcryptjs'
import UserModel from '../models/user.model.js'
import { generateAndSetToken } from '../utils/generateAndSetToken.js'
import {
  createUserSchema,
  loginUserSchema,
} from '../validations/user.validation.js'

export const signup = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const isValidBody = createUserSchema.safeParse(req.body)
    if (!isValidBody.success) {
      return next(new GenerateError('Invalid body', 400, 'error'))
    }
    const { fullName, email, password, confirmPassword, role } =
      isValidBody.data
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return next(new GenerateError('User already exists', 400, 'error'))
    }
    if (password !== confirmPassword) {
      return next(new GenerateError('Passwords do not match', 400, 'error'))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    })
    generateAndSetToken(
      { userId: user._id.toString(), role: user.role, email: user.email },
      req,
      res
    )
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: user,
    })
  }
)

export const login = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    const isValidBody = loginUserSchema.safeParse(req.body)
    if (!isValidBody.success) {
      return next(new GenerateError('Invalid body', 400, 'error'))
    }
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
      return next(new GenerateError('Invalid email or password', 400, 'error'))
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return next(new GenerateError('Invalid email or password', 400, 'error'))
    }
    generateAndSetToken(
      { userId: user._id.toString(), role: user.role, email: user.email },
      req,
      res
    )
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      data: user,
    })
  }
)

export const logout = asyncMiddleware(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token')
    res.status(200).json({
      status: 'success',
      message: 'User logged out successfully',
    })
  }
)
