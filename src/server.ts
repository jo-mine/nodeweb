import { log } from 'console'
import express from 'express'
import errorHandler from './libs/middleware/errorHandler'
import callableHandler from './libs/middleware/callableHandler'

const server = express()
server.all('/index/:app-:module-:action',
    callableHandler,
    async (req, res) => {
        const { app, module, action } = req.params
        const modulePath = `./apps/${app}/modules/${module}/index.ts`

        const serverAction = (await import(modulePath))[action]
        serverAction()
    })
server.use(errorHandler) // エラーハンドラは最後に追加する

const port = 8080

server.listen(port)

log(`listening the port: ${port}`)