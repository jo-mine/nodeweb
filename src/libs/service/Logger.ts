import fs from "node:fs"
import { join } from "node:path"
import dayjs from "dayjs"
import { injectable } from "inversify"
import { LOG_FOLDER } from "../../configs/path"

type LogFile = "log.log" | "error.log"

@injectable()
export class Logger {
    public static readonly id = "Logger"
    public log(content: number | string): void {
        const _content = typeof content === "number" ? content.toString() : content
        this.write("log.log", _content)
    }

    public error(content: number | string): void {
        const _content = typeof content === "number" ? content.toString() : content
        this.write("error.log", _content)
    }

    protected write(filename: LogFile, content: string): void {
        const now = dayjs().format("YYYY-MM-DD hh:mm:ss")
        fs.appendFileSync(join(LOG_FOLDER, filename), `[${now}] ${content}\n`)
    }
}
