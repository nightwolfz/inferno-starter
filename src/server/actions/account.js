import jwt from 'jwt-simple'
import crypto from 'crypto'
import db from '../helpers/database'
import config from '../../../config/server'

/**
 * Get account by token
 * @param token {string}
 * @returns {object}
 */
export async function getAccount(token) {
    if (token) {
        const account = await db.account.findOne({ token })
        if (!account) return null
        return account.toJSON()
    }
}

export async function loginAccount(username, password) {
    const account = await db.account.findOne({
        username,
        password: sha512(password)
    })
    if (account) {
        if (!checkAuthToken(account.token)) {
            account.token = createAuthToken(account._id)
            await account.save()
        }
        return account.toJSON()
    }
}

export async function registerAccount(username, password) {
    const account = new db.account({
        username,
        password: sha512(password)
    })
    account.token = createAuthToken(account._id)
    await account.save()
    return account
}

export async function updateAccount(body, file, token) {
    const query = {}

    const userExists = await db.account.findOne({ username: body.username }, '_id').lean()
    if (userExists) return false

    if (body.username) query.username = body.username
    if (body.description) query.description = body.description

    const user = await db.account.findOneAndUpdate(
        { token },
        { $set: query },
        { new: true }
    ).lean()

    return {
        username: user.username,
        description: user.description,
        picture: user.picture
    }
}


/**
 * Check if we're logged in
 * @param token {string}
 * @returns {boolean}
 */
export async function checkAuthorized(token) {
    if (!token) return Promise.reject('Token not provided')
    const account = await db.account.findOne({ token }, 'token')
    if (account && checkAuthToken(account.token)) {
        return Promise.resolve(account)
    }
    return Promise.reject('Invalid token')
}

/**
 * Returns the token back if it's still valid
 * @private
 * @param token {string}
 * @returns {boolean}
 */
function checkAuthToken(token) {
    if (!token) return false
    const decoded = jwt.decode(token, config.session.secret)
    return (Date.now() < decoded.expires) ? token : false
}

/**
 * Create a new token with a timestamp
 * @private
 * @param accountID {string}
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
 * @param str
 * @returns {string}
 */
function sha512(str) {
    return crypto.createHmac('sha512', config.session.salt).update(str).digest('hex')
}
