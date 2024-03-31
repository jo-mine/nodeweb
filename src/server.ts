// reflect-metadataでDIの準備をするようで、最初にimportしておくほうが無難
import "reflect-metadata"

import { join } from "node:path"
import * as bodyParser from "body-parser"
import "dotenv/config"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import { cache, renderFile } from "twig"
import "./controllers"
import errorHandler from "./libs/middleware/errorHandler"
import { isProduction } from "./libs/utils/env"
import { bindService } from "./services"
import { static as expressstatic } from "express"

// 本番は80、開発は81番にする
const port = isProduction ? 80 : 81
const container = bindService(new Container({ defaultScope: "Singleton" }))

new InversifyExpressServer(container)
    .setConfig((app) => {
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        )
        app.use(bodyParser.json())
        app.engine("twig", renderFile)
        app.set("view engine", "twig")
        app.set("views", join(__dirname, "frontend/views"))
        app.set("view cache", isProduction)
        cache(isProduction)

        // 仮実装。フロントエンドのjs配置考える
        app.use("/resources", expressstatic(join(__dirname, "frontend/assets")))
        return app
    })
    .setErrorConfig((app) => {
        app.use(errorHandler)
    })
    .build()
    .listen(port, () => {
        console.log(`listening the port: ${port}`)
    })

export { container }
