import { databaseConfig } from "@/configs/database"
import { Connection } from "@/libs/Connection"

interface IEngine {
    ENGINE: string
    SUPPORT: string
    COMMENT: string
    TRANSACTIONS: string
    XA: string
    SAVEPOINTS: string
}

export const getEngines = async (): Promise<IEngine[]> => {
    const con = new Connection(databaseConfig)
    return await con.select("select * from information_schema.ENGINES")
}
