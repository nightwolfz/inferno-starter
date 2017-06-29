import { checkAuthorized } from '../routes/account'

/**
 * Middleware for checking if we're logged in
 * @param ctx
 * @param next
 */
export default async function(ctx, next) {
  try {
    const auth = await checkAuthorized(ctx)
    if (auth) await next()
  } catch(error) {

    console.error(error)
    if (ctx.headers['user-agent'].includes('node-fetch')) {
      ctx.authorized = false
      ctx.token = null
      await next()
    } else {
      ctx.redirect('/page/login')
      ctx.status = 401
    }
  }
}
