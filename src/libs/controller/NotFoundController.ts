import type { Request, Response } from "express"
import { inject } from "inversify"
import { controller, httpGet, request, response } from "inversify-express-utils"
import { Logger } from "../service/Logger"
import { BaseController } from "./BaseController"

@controller("*")
export class NotFoundController extends BaseController {
    constructor(@inject(Logger.symbol) private readonly logger: Logger) {
        super()
    }

    @httpGet("/")
    private async index(@request() req: Request, @response() res: Response): Promise<string> {
        return await this.render(res, "404.swig.html")
    }
}
