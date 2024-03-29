import { type ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
  next()
}

export default errorHandler
