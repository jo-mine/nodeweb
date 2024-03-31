import type { Container } from "inversify"
import { Assets } from "./libs/service/Assets"
import { Logger } from "./libs/service/Logger"

export const bindService = (c: Container): Container => {
    c.bind<Logger>(Logger.id).to(Logger)
    c.bind<Assets>(Assets.id).to(Assets)
    return c
}
