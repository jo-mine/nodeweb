export const ASSETS_BASE_PATH = process.env.ASSETS_BASE_PATH

export const getAssetsPath = (additionalPath: string) => ASSETS_BASE_PATH + additionalPath.replace(/^\//, "")
