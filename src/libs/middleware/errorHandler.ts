import type { ErrorRequestHandler } from "express"
import { container } from "../../server"
import { Logger } from "../service/Logger"

const errorHandler: ErrorRequestHandler = (err: Error | null, req, res, next) => {
    const logger = container.get<Logger>(Logger.symbol)
    if (err !== null) {
        logger.error(err.stack ?? err.message)
    }
    res.status(500).send("Something broke!")
    next()
}

export default errorHandler
