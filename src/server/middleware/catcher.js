/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 * @returns {function}
 */
export default async function(ctx, next) {
    try {
        await next()
    } catch(error) {
        console.error(error)
        if (process.env.DEV) {
            return ctx.throw(400, error.toString())
        }
    }
}
