import { type ErrorRequestHandler } from 'express'
import { container } from '../../server'
import { Logger } from '../service/Logger'

const errorHandler: ErrorRequestHandler = (err: unknown, req, res, next) => {
    const logger = container.get<Logger>(Logger.symbol)
    if (err instanceof Error && err.stack !== undefined) {
        logger.error(err.stack)
    }
    res.status(500).send('Something broke!')
    next()
}

export default errorHandler
