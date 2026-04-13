import express from 'express'
import {
  checkAuth,
  login,
  logout,
  signup,
} from '../controllers/user.controllers.js'
import protectedRouteMiddleware from '../middleware/protectedRoute.middleware.js'

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/checkAuth', protectedRouteMiddleware, checkAuth)

export default authRouter
