export default class GenerateError extends Error {
  statusCode: number
  status: string

  constructor(message: string, statusCode: number, status: string) {
    super(message)
    this.statusCode = statusCode
    this.status = status
    this.name = this.constructor.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
