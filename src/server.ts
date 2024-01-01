import { log } from 'console'
import "reflect-metadata"
import errorHandler from './libs/middleware/errorHandler'
import callableHandler from './libs/middleware/callableHandler'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'

const container = new Container()
const server = new InversifyExpressServer(container)
const app = server.build()
    .set("view engine", "ejs")
    .all('/index/:app-:module-:action',
    callableHandler,
    async (req, res) => {
        const { app, module, action } = req.params
        const modulePath = `./apps/${app}/modules/${module}/index.ts`

        const serverAction = (await import(modulePath))[action]
        serverAction()
        // res.render('<?=text?>', {text: 'hello world'})
        res.end('end world')
    })
    .use(errorHandler) // エラーハンドラは最後に追加する

const port = 8080

app.listen(port)

log(`listening the port: ${port}`)