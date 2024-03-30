import { join } from "node:path"
import { isProduction } from "@/libs/utils/env"
export const LOG_FOLDER = isProduction ? "/var/log" : join(__dirname, "../logs")
