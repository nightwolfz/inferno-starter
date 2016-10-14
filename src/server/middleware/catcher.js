import logger from 'debug'

/**
 * Middleware for catching errors thrown in routes
 * @param fn {function}
 * @returns {function}
 */
export default (fn) => async(ctx, next) => {
    try {
        await next()
    } catch(error) {
        logger(`app:catcher`)(error)
        return ctx.throw(400, error.toString())
    }
}
