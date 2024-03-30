import * as express from 'express'
import { controller, httpGet, httpPost, httpDelete, request, response, requestParam } from 'inversify-express-utils'
import dayjs from 'dayjs'
import { BaseController } from '../../libs/controller/BaseController'
import { inject } from 'inversify'
import { Logger } from '../../libs/service/Logger'

@controller('/sample')
export class Sample extends BaseController {
    constructor (@inject(Logger.symbol) private readonly logger: Logger) {
        super()
    }

    @httpGet('/')
    private async index (@request() req: express.Request, @response() res: express.Response): Promise<string> {
        res.setHeader('Content-Type', 'text/html')
        throw new Error('something errorrrrr')
        this.logger.log(dayjs().format('YYYY-MM-DD hh:mm:ss'))
        return await this.render(res, 'index.swig.html', { value: dayjs().format('YYYY-MM-DD h:m:s') })
    }

    @httpGet('/s2')
    private index2 (@request() req: express.Request, @response() res: express.Response): void {
    // return this.fooService.get(req.query.id)
    // res.json({ value: dayjs().format('YYYY-MM-DD') })
    // return
        res.setHeader('Content-Type', 'text/html')
        console.log(req.params)
        res.send('ok')
        this.logger.error(dayjs().format('YYYY-MM-DD hh:mm:ss'))
    // res.render('index.swig', )
    }

    // @httpGet('/')
    // private list (@queryParam('start') start: number, @queryParam('count') count: number): string {
    //   // return this.fooService.get(start, count)
    //   return 'b'
    // }

    @httpPost('/')
    private async create (@request() req: express.Request, @response() res: express.Response): Promise<void> {
        try {
            //   await this.fooService.create(req.body)
            res.sendStatus(201)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    @httpDelete('/:id')
    private async delete (@requestParam('id') id: string, @response() res: express.Response): Promise<void> {
    // return this.fooService.delete(id)
    //   .then(() => res.sendStatus(204))
    //   .catch((err: Error) => {
    //     res.status(400).json({ error: err.message })
    //   })
        res.sendStatus(201)
    }
}
