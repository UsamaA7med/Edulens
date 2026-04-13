import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const generateAndSetToken = (
  { userId, role, email }: { userId: string; role: string; email: string },
  req: Request,
  res: Response
) => {
  const token = jwt.sign({ userId, role, email }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
}
