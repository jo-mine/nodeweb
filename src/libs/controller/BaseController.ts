import { join } from "node:path"
import { container } from "@/server"
import type { Request, Response } from "express"
import { BaseHttpController } from "inversify-express-utils"
import type { Assets } from "../service/Assets"

export class BaseController extends BaseHttpController {
    protected async renderAction(req: Request, res: Response, options: Record<string, unknown> = {}): Promise<string> {
        const paths = (req.route.path as string).split("/").filter((v) => v.length > 0)
        const action = paths.pop()
        const view = join(...paths, `${action}.html.twig`)
        options.container = container
        this.addActionJavascript(req)

        return await this.render(res, view, options)
    }

    protected addActionJavascript(req: Request): void {
        const paths = (req.route.path as string).split("/").filter((v) => v.length > 0)
        const action = paths.pop()
        const js = join("/assets/js", ...paths, `${action}.js`)
        const assets = container.get<Assets>("Assets")
        assets.addJs(js)
    }

    protected async render(res: Response, view: string, options: Record<string, unknown> = {}): Promise<string> {
        options.container = container

        return await new Promise((resolve, reject) => {
            res.render(view, options, (err: Error | null, html) => {
                if (err !== null) {
                    reject(err)
                    return
                }

                resolve(html)
            })
        })
    }
}
