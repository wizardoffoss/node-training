import { log } from "console"

const loggerMiddleware = (req: Request,res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

export default loggerMiddleware