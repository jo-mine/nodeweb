import { log } from 'console'
import * as http from 'http'

const port = 8080

const server = http.createServer((req, res) => {
    log('accessed2')
    res.end("hello world: " + new Date())
})

server.listen(port)

log(`listening the port: ${port}`)