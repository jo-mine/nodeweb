import { type App, type CreateAppFunction, createApp as baseCreateApp } from "vue"
import { configurePrimeVue } from "./PrimeVue"

export const createApp: CreateAppFunction<Element> = (component): App => {
    const app = baseCreateApp(component)
    app.config.compilerOptions.delimiters = ["[[", "]]"]
    return configurePrimeVue(app)
}
