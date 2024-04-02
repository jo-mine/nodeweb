import { databaseConfig } from "@/configs/database"
import { injectable } from "inversify"
import * as mysql from "mysql"

type SqlParams = Record<string, string | number | (string | number)[]>

// @injectable()
export class Connection {
    protected connection: mysql.Connection

    constructor() {
        this.connection = mysql.createConnection(databaseConfig)
    }

    protected connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve()
            })
        })
    }

    protected end(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve()
            })
        })
    }

    async select<T>(sql: string, params: SqlParams = {}): Promise<T> {
        await this.connect()
        const result = await this.query<T>(sql, params)
        await this.end()
        return result
    }

    protected query<T>(sql: string, params: SqlParams): Promise<T> {
        const queryOptions: mysql.QueryOptions = this.replacePlaceholders(sql, params)
        // 要検討
        queryOptions.timeout = undefined
        queryOptions.typeCast = undefined

        return new Promise((resolve, reject) => {
            this.connection.query(queryOptions, (error, results, fields) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(results)
            })
        })
    }

    protected replacePlaceholders(
        sql: string,
        params: Record<string, string | number | (string | number)[]>,
    ): {
        sql: string
        values: (string | number)[]
    } {
        if (Object.values(params).some((v) => Array.isArray(v) && v.length === 0)) {
            throw new Error("Cannot use empty array to placeholder")
        }
        const regex = /:\w+/g
        const replaceTargets = sql.match(regex)
        if (replaceTargets === null) {
            if (Object.keys(params).length > 0) {
                throw new Error("Mismatched number of params: placeholders is not found")
            }
            return {
                sql,
                values: [],
            }
        }
        if (replaceTargets.length !== Object.keys(params).length) {
            throw new Error("Mismatched number of params: not equal placeholders count")
        }
        if (replaceTargets.length !== Array.from(new Set(replaceTargets)).length) {
            throw new Error("Mismatched number of placeholders: duplication")
        }
        const values: (string | number)[] = []
        sql.replaceAll(regex, (target): string => {
            const value = params[target]
            if (Array.isArray(value)) {
                values.push(...value)
                return [...Array(value.length)].fill("?").join(",")
            }
            values.push(value)
            return "?"
        })
        return {
            sql,
            values,
        }
    }
}
