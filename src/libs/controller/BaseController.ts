import { container } from "@/server"
import { join } from "node:path"
import type { Request, Response } from "express"
import { BaseHttpController } from "inversify-express-utils"
import { Logger } from "../service/Logger"

export class BaseController extends BaseHttpController {
    protected async renderLocal(req: Request, res: Response, view: string, options: object = {}): Promise<string> {
        const paths = req.route.path.split("/")
        const _view = join("controllers", ...paths, "views", view)
        return await new Promise((resolve, reject) => {
            res.render(_view, options, (err: Error | null, html) => {
                if (err !== null) {
                    const logger = container.get<Logger>(Logger.symbol)
                    logger.error(err.stack ?? err.message)
                }

                resolve(html)
            })
        })
    }

    protected async render(res: Response, view: string, options: object = {}): Promise<string> {
        const _view = join("assets/views", view)
        return await new Promise((resolve, reject) => {
            res.render(_view, options, (err: Error | null, html) => {
                if (err !== null) {
                    const logger = container.get<Logger>(Logger.symbol)
                    logger.error(err.stack ?? err.message)
                }

                resolve(html)
            })
        })
    }
}
