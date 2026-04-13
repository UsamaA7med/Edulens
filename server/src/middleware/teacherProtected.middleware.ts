import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const teacherProtectedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      role: string
      email: string
    }
    if (typeof decoded === 'object' && decoded.role !== 'teacher') {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden',
      })
    }
    req.user = decoded
    next()
  } catch (error) {
    console.error('JWT Error:', error) // <-- add this temporarily
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    })
  }
}

export default teacherProtectedMiddleware
