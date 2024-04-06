import { Elysia } from "elysia"

console.log(process.env)
const app = new Elysia().get("/", () => "Hello Elysia").listen(process.env.PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
