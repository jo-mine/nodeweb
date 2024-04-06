import Elysia from "elysia"
import { UnAuthorized } from "../error/UnAuthorized"
import { logger } from "../Logger"

export const ErrorHandler = new Elysia()
    .error({
        UnAuthorized,
    })
    .onError(({ code, error, set }) => {
        logger.error(`${code}: ${error.message}`)
        logger.error(error.stack)
        switch (code) {
            case "NOT_FOUND":
                return new Response(code, { status: 404, statusText: code })
            case "VALIDATION":
                return new Response(code, { status: 400, statusText: code })
            case "INVALID_COOKIE_SIGNATURE":
                return new Response(code, { status: 400, statusText: code })
            case "INTERNAL_SERVER_ERROR":
                return new Response(code, { status: 500, statusText: code })
            case "PARSE":
                return new Response(code, { status: 500, statusText: code })
            case "UNKNOWN":
                return new Response(code, { status: 500, statusText: code })
            case "UnAuthorized":
                set.redirect = "/user"
                break
            default:
                return new Response(code, { status: 500, statusText: code })
        }
    })
