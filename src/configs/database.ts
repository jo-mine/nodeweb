import databaseJson from "./database.json"
import { isProduction } from "@/libs/utils/env"

const environment = isProduction ? "production" : "develop"

export const databaseConfig = databaseJson[environment]
