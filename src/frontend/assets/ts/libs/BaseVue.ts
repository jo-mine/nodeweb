import { type App, type CreateAppFunction, createApp as baseCreateApp } from "vue"

export const createApp: CreateAppFunction<Element> = (component): App => {
    return baseCreateApp(component)
}
