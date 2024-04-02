import { Connection } from "@/libs/Connection"
;(async () => {
    console.log(await new Connection().select("select * from information_schema.ENGINES"))
})()
