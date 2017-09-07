/**
 * Middleware for checking if we're logged in
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {

  if (ctx.account && !ctx.token) {
    ctx.redirect('/page/login')
    ctx.status = 401
    throw new Exception('Token is invalid: ' + ctx.token)
  }

  ctx.authorized = ctx.account && ctx.account.id && ctx.token
  await next()
}
