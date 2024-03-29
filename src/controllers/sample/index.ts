import * as express from 'express'
import { type interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam, next, BaseHttpController } from 'inversify-express-utils'
import { injectable, inject } from 'inversify'
import dayjs from 'dayjs'

@controller('/sample')
export class FooController extends BaseHttpController {
//   constructor (@inject('FooService') private readonly fooService: FooService) {}

  @httpGet('/')
  private index (@request() req: express.Request, @response() res: express.Response): void {
    // return this.fooService.get(req.query.id)
    // res.json({ value: dayjs().format('YYYY-MM-DD') })
    // return
    res.setHeader('Content-Type', 'text/html')
    res.render('index.swig')
    // res.render('index.swig', { value: dayjs().format('YYYY-MM-DD') }, (e, h) => {
    //   console.log(e)
    //   console.log(h)
    //   res.send(h)
    // })
  }

  @httpGet('/s2')
  private index2 (@request() req: express.Request, @response() res: express.Response): void {
    // return this.fooService.get(req.query.id)
    // res.json({ value: dayjs().format('YYYY-MM-DD') })
    // return
    res.setHeader('Content-Type', 'text/html')
    console.log(req.params)
    res.send('ok')
    // res.render('index.swig', { value: dayjs().format('YYYY-MM-DD') })
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
