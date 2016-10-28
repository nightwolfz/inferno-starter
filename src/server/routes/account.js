import jwt from 'jwt-simple'
import crypto from 'crypto'
import router from 'koa-router'
import config from '../config'
import Account from '../models/Account'

export default router()
.get('/api/account/logout', logoutAccount)
.post('/api/account/login', loginAccount)
.post('/api/account/register', registerAccount)


/**
 * Get account by token
 * @param token {string}
 * @returns {object}
 */
export async function getAccount(token) {
    if (token) {
        const account = await Account.findOne({ token })
        return account && account.toJSON()
    }
}

async function loginAccount(ctx) {
    const { username, password } = ctx.request.fields
    const account = await Account.findOne({
        username,
        password: sha512(password, { salt: username })
    })
    if (!account) throw new Error('Wrong credentials')

    account.token = createAuthToken(account._id)
    await account.save()

    ctx.cookies.set('token', account.token)
    ctx.body = account.toJSON()
}

async function logoutAccount(ctx) {
    if (!ctx.token) return ctx.res.json(false)

    const user = await Account.findOneAndUpdate({ token: ctx.token }, { token: null })
                              .lean() // clear in db

    ctx.cookies.set('token', null)
    ctx.body = user
}

async function registerAccount(ctx) {
    const { username, password, email } = ctx.request.fields

    if (!isValidUsername(username)) {
        throw new Error('Username cannot contain special characters')
    }
    const exists = await Account.count({ username })
    if (exists) throw new Error('Username already taken')

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
export async function checkAuthorized(token) {
    if (!token) throw new Error('Token not provided')
    const account = await Account.findOne({ token }, 'token')
    if (account) {
        const decoded = jwt.decode(account.token, config.session.secret)
        if (Date.now() < decoded.expires) {
            return account
        } else {
            // Add renew or redirect functionality
            throw new Error('Token expired: ' + new Date(decoded.expires))
        }
    }
    throw new Error('Invalid token')
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
