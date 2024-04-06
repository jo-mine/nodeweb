import { Elysia } from "elysia"
import { user } from "./backend/user"

console.log(process.env)
const app = new Elysia()
    .use(user)
    .get("/", () => "Hello Elysia")
    .listen(process.env.PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
