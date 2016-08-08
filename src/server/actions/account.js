import jwt from 'jwt-simple'
import crypto from 'crypto'
import db from '../helpers/database'
import config from '../../../configuration/server.config'

// Public
export {
    getAccount,
    checkAuthorized,
    loginAccount,
    registerAccount
}

/**
 * Get account by session
 * @param token {string}
 * @returns {object}
 */
async function getAccount(token) {
    if (token) {
        const account = await db.account.findOne({ token })
        if (!account) return null
        return account.toJSON()
    }
}

async function loginAccount(username, password, token) {
    const account = await db.account.findOne({
        username,
        password: sha512(password)
    })
    if (!account) return null

    account.token = createAuthToken(account._id)
    await account.save()
    return account.toJSON()
}

async function registerAccount(username, password) {
    const account = new db.account({
        username,
        password: sha512(password)
    })
    account.token = createAuthToken(account._id)
    await account.save()
    return account
}



/**
 * Check if logged in
 * @param token {string}
 * @returns {boolean}
 */
async function checkAuthorized(token) {
    if (!token) return Promise.reject('Token not provided')
    const account = await db.account.findOne({ token }, 'token')
    if (account) {
        const decoded = jwt.decode(account.token, config.session.secret)
        const isValid = Date.now() < decoded.expires
        console.log('checkAuthorized', decoded)
        console.log('Date.now       ', Date.now())
        console.log('decoded.expires', decoded.expires)
        console.log('isValid', isValid)
        if (isValid) {
            return Promise.resolve(account)
        } else {
            return Promise.reject('Invalid token')
        }
    }
}

/**
 * Create a new token with a timestamp
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
 * @param str
 * @returns {string}
 */
function sha512(str) {
    return crypto.createHmac('sha512', config.session.salt).update(str).digest('hex')
}
