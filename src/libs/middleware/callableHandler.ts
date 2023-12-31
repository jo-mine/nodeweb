import { Handler } from "express"
import { existsSync } from 'fs'

const callableHandler:Handler = async (req, res, next) => {
    const {app,module,action} = req.params
    const filePath = `${__dirname}/../../apps/${app}/modules/${module}/index.ts`
    if(!existsSync(filePath)) {
        throw new Error('not found')
    }
    const modulePath = `../../apps/${app}/modules/${module}/index.ts`

    try {
        const actionModule = (await import(modulePath)).default
        if (!Object.hasOwn(actionModule, action)) {
            throw new Error('not found')
        }
        // FIXME: パラメータが足りているか
    } catch (error) {
        throw new Error('not found')
    }
    next()
}

export default callableHandler