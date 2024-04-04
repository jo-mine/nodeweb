import { type App, type CreateAppFunction, createApp as baseCreateApp } from "vue"
import PrimeVue from "primevue/config"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

export const createApp: CreateAppFunction<Element> = (component): App => {
    return baseCreateApp(component).use(PrimeVue).component("DataTable", DataTable).component("Column", Column)
}
