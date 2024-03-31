import { defineComponent, onMounted } from "vue"
import { createApp } from "../../libs/BaseVue"

createApp(
    defineComponent({
        setup() {
            onMounted(() => console.log("mounted"))
        },
    }),
).mount("#app")
