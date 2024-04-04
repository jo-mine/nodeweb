import { Logger } from "@//libs/service/Logger"
import { BaseController } from "@/libs/controller/BaseController"
import dayjs from "dayjs"
import type * as express from "express"
import { inject } from "inversify"
import { controller, httpDelete, httpGet, httpPost, request, requestParam, response } from "inversify-express-utils"
import { getEngines } from "./Dal"

@controller("/operation/sample")
export class Sample extends BaseController {
    constructor(@inject(Logger.id) private readonly logger: Logger) {
        super()
    }

    @httpGet("/index")
    private async index(@request() req: express.Request, @response() res: express.Response): Promise<string> {
        res.setHeader("Content-Type", "text/html")
        const engineList = await getEngines()
        console.log(engineList)
        return await this.renderAction(req, res, {
            value: dayjs().format("YYYY-MM-DD hh:mm:ss"),
            engineList: engineList,
        })
    }

    @httpGet("/s2")
    private index2(@request() req: express.Request, @response() res: express.Response): void {
        // return this.fooService.get(req.query.id)
        // res.json({ value: dayjs().format('YYYY-MM-DD') })
        // return
        res.setHeader("Content-Type", "text/html")
        console.log(req.params)
        // res.send("ok")
        this.logger.error(dayjs().format("YYYY-MM-DD hh:mm:ss"))
        throw new Error("something errorrrrr")
        // res.render('index.swig', )
    }

    // @httpGet('/')
    // private list (@queryParam('start') start: number, @queryParam('count') count: number): string {
    //   // return this.fooService.get(start, count)
    //   return 'b'
    // }

    @httpPost("/")
    private async create(@request() req: express.Request, @response() res: express.Response): Promise<void> {
        try {
            //   await this.fooService.create(req.body)
            res.sendStatus(201)
        } catch (err) {
            res.status(400).json({ error: (err as Error).message })
        }
    }

    @httpDelete("/:id")
    private async delete(@requestParam("id") id: string, @response() res: express.Response): Promise<void> {
        // return this.fooService.delete(id)
        //   .then(() => res.sendStatus(204))
        //   .catch((err: Error) => {
        //     res.status(400).json({ error: err.message })
        //   })
        res.sendStatus(201)
    }
}
