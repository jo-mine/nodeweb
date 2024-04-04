// import { isProduction } from "../libs/utils/env"
// import databaseJson from "./database.json"

const env = "develop"
// const env = isProduction ? "production" : "develop"
export const databaseConfig = env
// export const databaseConfig = databaseJson[env]
export const obj = { 1: 2 }
const value = 3
export { value }
