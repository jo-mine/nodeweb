import { join } from "node:path"
import { isProduction } from "@/libs/utils/env"
export const LOG_FOLDER = isProduction ? "/var/log" : join(__dirname, "../logs")
export const ASSETS_BASE_PATH = isProduction ? "/" : "http://localhost:5173/"
