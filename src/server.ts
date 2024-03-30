// reflect-metadataでDIの準備をするようで、最初にimportしておくほうが無難
import "reflect-metadata"

import { join } from "node:path"
import * as bodyParser from "body-parser"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import { cache, renderFile } from "twig"
import "./controllers"
import errorHandler from "./libs/middleware/errorHandler"
import { bindService } from "./services"
import "dotenv/config"
import { isProduction } from "./libs/utils/env"

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
        app.set("views", join(__dirname, "apps/assets/views"))
        app.set("view cache", isProduction)
        cache(isProduction)
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
