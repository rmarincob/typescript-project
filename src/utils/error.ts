class CustomError extends Error {
  code: number
  success: boolean = false

  constructor (message: string, code: number = 400) {
    super(message)
    this.code = code
  }
}

export default CustomError
