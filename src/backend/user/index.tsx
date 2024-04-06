import { html } from "@elysiajs/html"
import Elysia from "elysia"
import { getAssetsPath } from "../../configs/path"
import { dal } from "./dal"

export const user = new Elysia()
    .use(html())
    .decorate({ dal })
    .get("/user", async ({ dal }) => {
        return index({ text: "hogehoge", engineList: await dal.selectEngineList() })
    })

const index = ({ text, engineList }: { text: string; engineList: unknown[] }) => (
    <html lang="en">
        <head>
            <title>Hello World</title>
            <script type="text/javascript">const engineList = {JSON.stringify(engineList)}</script>
            <script type="module" src={getAssetsPath("js/user/index.js")} />
            <link rel="stylesheet" type="text/css" href={getAssetsPath("css/index.css")} />
        </head>
        <body>
            <div id="app" v-cloak>
                <h1>Hello World</h1>
                <div>{text}</div>
                <div>[[text]]</div>
            </div>
        </body>
    </html>
)
