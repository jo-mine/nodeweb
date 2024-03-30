import { createApp, defineComponent, onMounted } from "vue"

createApp(
    defineComponent({
        setup() {
            onMounted(() => console.log("mounted"))
        },
    }),
).mount("#app")
