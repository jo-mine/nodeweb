import { join } from "node:path"
import { container } from "@/server"
import type { RequestHandler } from "express"
import { Assets } from "../service/Assets"
import { isProduction } from "../utils/env"

export const assetsSetter: RequestHandler = (req, res, next) => {
    if (!isProduction) {
        container.get<Assets>(Assets.id).addJs("/@vite/client")
    }
    next()
}
