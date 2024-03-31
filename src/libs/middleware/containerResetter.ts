import { container } from "@/server"
import type { RequestHandler } from "express"
import { Assets } from "../service/Assets"

export const containerReSetter: RequestHandler = (req, res, next) => {
    /**
     * Assetsにはサーバーリクエスト度に必要なjsパスを設定したいが、
     * 依存注入のスコープがシングルトン・container.getの一連の処理・container.get度しかなく、サーバーリクエスト度がない。
     * そのため、expressのミドルウェアで毎回新しいAssetsで上書きする。
     */
    container
        .rebind<Assets>(Assets.id)
        .toDynamicValue(() => new Assets())
        .inSingletonScope()
    next()
}
