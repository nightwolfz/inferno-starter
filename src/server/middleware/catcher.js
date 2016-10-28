import logger from 'debug'

/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 * @returns {function}
 */
export default async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        logger(`app:catcher`)(error)
        return ctx.throw(400, error.toString())
    }
}
