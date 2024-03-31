// reflect-metadataでDIの準備をするようで、最初にimportしておくほうが無難
import "reflect-metadata"

import { join } from "node:path"
import * as bodyParser from "body-parser"
import "dotenv/config"
import { static as expressstatic } from "express"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import { cache, renderFile } from "twig"
import "./controllers"
import errorHandler from "./libs/handler/errorHandler"
import { assetsSetter } from "./libs/middleware/assetsSetter"
import { isProduction } from "./libs/utils/env"
import { bindService } from "./services"
import { containerReSetter } from "./libs/middleware/containerResetter"

// 本番は80、開発は81番にする
const port = isProduction ? 80 : 81
const container = bindService(new Container({ defaultScope: "Singleton" }))

new InversifyExpressServer(container)
    .setConfig((app) => {
        // わからない
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        )
        app.use(bodyParser.json())

        // テンプレートエンジン
        app.engine("twig", renderFile)
        app.set("view engine", "twig")
        app.set("views", join(__dirname, "frontend/views"))
        app.set("view cache", isProduction)
        cache(isProduction)

        // 公開パス
        app.use("/assets", expressstatic(join(__dirname, "frontend/assets")))

        // ミドルウェア
        app.use(containerReSetter)
        app.use(assetsSetter)

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
