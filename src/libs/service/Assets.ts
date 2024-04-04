import fs from "node:fs"
import { join } from "node:path"
import dayjs from "dayjs"
import { injectable } from "inversify"
import { ASSETS_BASE_PATH } from "../../configs/path"

@injectable()
export class Assets {
    public static readonly id = "Assets"
    protected jsPaths: string[] = []
    protected cssPaths: string[] = []

    public addJs(path: string): void {
        this.jsPaths.push(path)
    }

    public getJsPaths(): string[] {
        return this.jsPaths.map((v) => ASSETS_BASE_PATH + v.replace(/^\//, ""))
    }

    public addCss(path: string): void {
        this.cssPaths.push(path)
    }

    public getCssPaths(): string[] {
        return this.cssPaths.map((v) => ASSETS_BASE_PATH + v.replace(/^\//, ""))
    }
}
