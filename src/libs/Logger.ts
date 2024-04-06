import fs from "node:fs"
import { join } from "node:path"
import dayjs from "dayjs"
import { LOG_FOLDER_PATH } from "@/configs/path"

type TLogFile = "log.log" | "error.log"

type TContentLike = number | string

const contentLikeToString = (content: TContentLike | Record<TContentLike, TContentLike> | TContentLike[] | undefined | null): string => {
    switch (typeof content) {
        case "string":
            return content
        case "number":
            return content.toString()
        case "object": {
            if (Array.isArray(content)) {
                return ["Array(", content.join("\n"), ")"].join("\n")
            }
            if (content === null) {
                return "[Null]"
            }
            const _content = Object.entries(content)
            return ["Object(", _content.map(([key, value]) => `${key}: ${value}`).join("\n"), ")"].join("\n")
        }
        case "undefined":
            return "[Undefined]"
    }
}

const write = (filename: TLogFile, content: string): void => {
    const now = dayjs().format("YYYY-MM-DD hh:mm:ss")
    fs.appendFileSync(join(LOG_FOLDER_PATH, filename), `[${now}] ${content}\n`)
}

const log = (content: TContentLike | Record<TContentLike, TContentLike> | TContentLike[] | undefined | null): void => {
    write("log.log", contentLikeToString(content))
}

const error = (content: TContentLike | Record<TContentLike, TContentLike> | TContentLike[] | undefined | null): void => {
    write("error.log", contentLikeToString(content))
}

export const logger = {
    log,
    error,
}
