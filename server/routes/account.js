import jwt from 'jwt-simple'
import crypto from 'crypto'
import config from '../config'
import Account from '../models/Account'

export async function login(ctx) {
  const { username, password } = ctx.request.fields
  const account = await Account.findOne({
    username,
    password: sha512(password, { salt: username })
  })
  if (!account) throw new Exception('Wrong credentials')

  account.token = createAuthToken(account._id)
  await account.save()

  ctx.cookies.set('token', account.token)
  ctx.body = account.toJSON()
}

export async function logout(ctx) {
  // Clear in db
  await Account.findOneAndUpdate({ token: ctx.token }, { token: null })

  ctx.cookies.set('token', null)
  ctx.body = {}
}

export async function register(ctx) {
  const { username, password, email } = ctx.request.fields

  if (!isValidUsername(username)) {
    throw new Exception('Username cannot contain special characters')
  }
  const exists = await Account.count({ username })
  if (exists) throw new Exception('Username already taken')

  const account = new Account({
    username,
    password: sha512(password, { salt: username }),
    email
  })
  account.token = createAuthToken(account._id)
  await account.save()

  ctx.cookies.set('token', account.token)
  ctx.body = account
}

/**
 * Check if we're logged in
 * @param token {string}
 * @returns {boolean}
 */
export async function checkAuthorized(ctx) {
  ctx.authorized = false
  if (!ctx.token) throw new Exception('Token not provided')

  const account = await Account.findOne({ token: ctx.token }, 'token')
  if (!account) throw new Exception('Invalid token')

  const decoded = jwt.decode(account.token, config.session.secret)
  if (Date.now() < decoded.expires) {
    ctx.authorized = true
  } else {
    ctx.cookies.set('token', null)
    throw new Exception('Token expired: ' + new Date(decoded.expires))
  }
}

/**
 * Create a new token with a timestamp
 * @private
 * @param accountID
 * @returns {string|*}
 */
function createAuthToken(accountID) {
  const payload = {
    accountID,
    expires: Date.now() + config.session.expires
  }
  return jwt.encode(payload, config.session.secret)
}

/**
 * Hash the password
 * @private
 * @param str {string}
 * @param options {object}
 * @returns {string}
 */
function sha512(str, options) {
  return crypto.createHmac('sha512', options.salt).update(str).digest('hex')
}

/**
 * Check for special characters
 * @param username
 * @returns {boolean}
 */
function isValidUsername(username) {
  return /^[a-z0-9_-]+$/i.test(username)
}
