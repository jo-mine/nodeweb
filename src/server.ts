import { log } from 'console'
import 'reflect-metadata'
import errorHandler from './libs/middleware/errorHandler'
// import callableHandler from './libs/middleware/callableHandler'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'
import './controllers/sample'
import { renderFile, setDefaults } from 'swig'
import express from 'express'

const port = 8080
const container = new Container()
// set up bindings
// container.bind<FooController>('FooController').to(FooController)
// new InversifyExpressServer(container)
//   .setConfig((app) => {
//     // app.use(bodyParser.urlencoded({
//     //   extended: true
//     // }))
//     // app.use(bodyParser.json())
//     app.engine('swig', renderFile)
//     app.set('view engine', 'swig')
//     app.set('views', `${__dirname}/views`)
//     app.set('view cache', false)
//     setDefaults({ cache: false })
//     app.use(errorHandler) // エラーハンドラは最後に追加する
//   })
//   .build()
// .listen(port)
express().engine('swig', renderFile).set('view engine', 'swig').set('views', `${__dirname}/views`).get('/sample', (req, res) => {
  res.render('index.swig', { value: 'aaa' })
}).listen(port)

log(`listening the port: ${port}`)
