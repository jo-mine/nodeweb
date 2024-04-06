declare module "bun" {
    interface Env {
        PORT: string
        ASSETS_BASE_PATH: string
        DB_HOST: string
        DB_USER: string
        DB_PASSWORD: string
        DB_DATABASE: string
    }
}
