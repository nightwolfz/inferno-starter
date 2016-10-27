import logger from 'debug'
import { checkAuthorized } from '../routes/account'

/**
 * Middleware for checking if we're logged in
 * @param ctx
 * @param next
 */
export default async function(ctx, next) {
    try {
        const auth = await checkAuthorized(ctx.token)
        logger('binder:authorized')(auth.token.substring(125))
        ctx.authorized = true
        await next()
    } catch(error) {
        logger('binder:forbidden')(error)
        ctx.authorized = false
        ctx.token = null
        ctx.redirect('/page/login')
        ctx.status = 401
        await next()
    }
}
