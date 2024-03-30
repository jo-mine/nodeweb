import { container } from "@/server"
import type { Response } from "express"
import { BaseHttpController } from "inversify-express-utils"
import { Logger } from "../service/Logger"

export class BaseController extends BaseHttpController {
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
