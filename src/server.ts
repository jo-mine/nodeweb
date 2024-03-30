// reflect-metadataでDIの準備をするようで、最初にimportしておくほうが無難
import "reflect-metadata"

import { log } from "node:console"
import { join } from "node:path"
import * as bodyParser from "body-parser"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import { renderFile, setDefaults } from "swig"
import "./controllers"
import errorHandler from "./libs/middleware/errorHandler"
import { bindService } from "./services"

const port = 8080
const container = bindService(new Container({ defaultScope: "Singleton" }))
new InversifyExpressServer(container)
    .setConfig((app) => {
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        )
        app.use(bodyParser.json())
        app.engine("html", renderFile)
        app.set("view engine", "html")
        app.set("views", join(__dirname, "views"))
        app.set("view cache", false)
        setDefaults({ cache: false })
        return app
    })
    .setErrorConfig((app) => {
        app.use(errorHandler)
    })
    .build()
    .listen(port, () => {
        log(`listening the port: ${port}`)
    })

export { container }
