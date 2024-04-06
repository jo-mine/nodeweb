import { defineComponent, onMounted } from "vue"
import { createApp } from "../libs/BaseVue"

declare const engineList: {
    ENGINE: string
    SUPPORT: string
    COMMENT: string
    TRANSACTIONS: string
    XA: string
    SAVEPOINTS: string
}
createApp(
    defineComponent({
        setup() {
            onMounted(() => console.log("mounted"))
            const text = "fugafuga"
            return {
                engineList,
                text,
            }
        },
    }),
).mount("#app")
