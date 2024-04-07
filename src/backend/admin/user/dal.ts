import { databaseConfig } from "../../../configs/database"
import { Connection } from "../../../libs/Connection"

export const dal = {
    async selectEngineList() {
        const con = new Connection(databaseConfig)
        return await con.select("select * from information_schema.ENGINES")
    },
}
