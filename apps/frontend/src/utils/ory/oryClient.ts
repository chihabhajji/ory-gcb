import { Configuration, FrontendApi } from "@ory/client"

export const BASE_PATH = "http://localhost:4000/.ory"
export const frontEndOryApi = new FrontendApi(new Configuration({
    basePath: BASE_PATH,
    baseOptions: {
        withCredentials: true
    }
}))

