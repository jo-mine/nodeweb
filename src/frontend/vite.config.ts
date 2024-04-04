import vue from "@vitejs/plugin-vue"
import { glob } from "glob"
import { defineConfig, splitVendorChunkPlugin } from "vite"

const getInput = async (): Promise<Record<string, string>> => {
    const tspaths = await glob("assets/ts/**/*.ts", { ignore: ["**/*.d.ts", "assets/ts/libs/*"] })
    const sasspaths = await glob("assets/sass/*.scss", { ignore: [] })

    const inputTsHash = tspaths.reduce(
        (carry, path) => {
            carry[path.replace("ts/", "").replace("assets/", "").replace(".ts", "")] = path
            return carry
        },
        {} as Record<string, string>,
    )
    const inputSassHash = sasspaths.reduce(
        (carry, path) => {
            carry[path.replace("sass/", "").replace("assets/", "").replace(".scss", "")] = path
            return carry
        },
        {} as Record<string, string>,
    )

    const inputHash = Object.assign(inputTsHash, inputSassHash)
    console.log("===== build mapping =====")
    console.log(inputHash)
    console.log("===== build mapping end =====")
    return inputHash
}

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/assets/js": {
                target: "http://localhost:5173",
                rewrite: (path) => path.replace("/js/", "/ts/").replace(".js", ".ts"),
            },
            "/assets/css": {
                target: "http://localhost:5173",
                rewrite: (path) => path.replace("/css/", "/sass/").replace(".css", ".scss"),
            },
        },
    },
    build: {
        manifest: true,
        outDir: "../../dist/frontend/",
        emptyOutDir: true,
        rollupOptions: {
            input: await getInput(),
            output: {
                entryFileNames: "assets/js/[name].js",
                assetFileNames: "assets/css/[name][extname]",
                chunkFileNames: "assets/js/chunk/[name]-[hash].js",
            },
        },
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
    plugins: [vue(), splitVendorChunkPlugin()],
})
