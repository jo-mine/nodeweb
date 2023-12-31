import { log } from 'console'
import express from 'express'
import errorHandler from './libs/middleware/errorHandler'
import callableHandler from './libs/middleware/callableHandler'

const app = express()
app.set("view engine", "ejs");
app.all('/index/:app-:module-:action',
    callableHandler,
    async (req, res) => {
        const { app, module, action } = req.params
        const modulePath = `./apps/${app}/modules/${module}/index.ts`

        const serverAction = (await import(modulePath))[action]
        serverAction()
        // res.render('<?=text?>', {text: 'hello world'})
        res.end('end world')
    })
app.use(errorHandler) // エラーハンドラは最後に追加する

const port = 8080

app.listen(port)

log(`listening the port: ${port}`)