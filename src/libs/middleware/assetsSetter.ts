import { container } from "@/server"
import type { RequestHandler } from "express"
import { Assets } from "../service/Assets"
import { isProduction } from "../utils/env"

export const assetsSetter: RequestHandler = (req, res, next) => {
    const assets = container.get<Assets>(Assets.id)
    assets.addCss("assets/css/index.css")
    if (!isProduction) {
        assets.addJs("/@vite/client")
    }
    next()
}
