import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateAndSetToken = (
  { id, role, email }: { id: string; role: string; email: string },
  req: Request,
  res: Response
) => {
  const token = jwt.sign({ id, role, email }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  })

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
}
