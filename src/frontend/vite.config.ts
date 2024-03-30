import vue from "@vitejs/plugin-vue"
import { defineConfig, splitVendorChunkPlugin } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "../../dist/frontend",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                "operation/sample/index": "./src/operation/sample/index.ts",
            },
            output: {
                entryFileNames: "assets/[name].js",
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
    plugins: [vue(), splitVendorChunkPlugin()],
})
