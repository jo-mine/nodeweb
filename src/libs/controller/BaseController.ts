import { join } from "node:path"
import { container } from "@/server"
import type { Request, Response } from "express"
import { BaseHttpController } from "inversify-express-utils"
import { Logger } from "../service/Logger"

export class BaseController extends BaseHttpController {
    protected async renderLocal(req: Request, res: Response, view: string, options: object = {}): Promise<string> {
        const paths = (req.route.path as string).split("/").filter((v) => v.length > 0)
        const _view = join(paths[0], view)
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
        return await new Promise((resolve, reject) => {
            res.render(view, options, (err: Error | null, html) => {
                if (err !== null) {
                    const logger = container.get<Logger>(Logger.symbol)
                    logger.error(err.stack ?? err.message)
                }

                resolve(html)
            })
        })
    }
}
