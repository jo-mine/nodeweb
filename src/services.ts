import type { Container } from "inversify"
import { Logger } from "./libs/service/Logger"

export const bindService = (c: Container): Container => {
    c.bind<Logger>(Logger.symbol).to(Logger).inSingletonScope()
    return c
}
