import { isProduction } from "@/libs/utils/env"
import { join } from "node:path"
export const LOG_FOLDER = isProduction ? "/var/log" : join(__dirname, "../logs")
