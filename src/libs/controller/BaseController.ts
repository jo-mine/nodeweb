import { type Response } from 'express'
import { BaseHttpController } from 'inversify-express-utils'

export class BaseController extends BaseHttpController {
    protected async render (res: Response, view: string, options: object = {}): Promise<string> {
        return await new Promise((resolve, reject) => {
            res.render(view, options, (err, html) => {
                console.log(err)

                resolve(html)
            })
        })
    }
}
