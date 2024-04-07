import { Elysia } from "elysia"
import { admin_user } from "./backend/admin/user"
import { UnAuthorized } from "./libs/error/UnAuthorized"
import { ErrorHandler } from "./libs/handler/ErrorHandler"

console.log(process.env)
const app = new Elysia()
    .use(ErrorHandler)
    .use(admin_user)
    .get("/unauthorize", () => {
        throw new UnAuthorized()
    })
    .listen(process.env.PORT)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
