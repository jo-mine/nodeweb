import vue from "@vitejs/plugin-vue"
import { defineConfig, splitVendorChunkPlugin } from "vite"
import { glob } from "glob"

const getInput = async (): Promise<Record<string, string>> => {
    const paths = await glob("assets/ts/**/*.ts", { ignore: ["**/*.d.ts", "assets/ts/libs/*"] })

    const inputHash = paths.reduce(
        (carry, path) => {
            carry[path.replace("ts/", "").replace("assets/", "").replace(".ts", "")] = path
            return carry
        },
        {} as Record<string, string>,
    )
    console.log("===== build mapping =====")
    console.log(inputHash)
    console.log("===== build mapping end =====")
    return inputHash
}

// https://vitejs.dev/config/
export default defineConfig({
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
    plugins: [vue(), splitVendorChunkPlugin()],
})
