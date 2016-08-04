import crypto from 'crypto'
import db from '../helpers/database'
import config from '../../../configuration/server.config'

export async function getAccount(session) {
    if (!session.id) return true
    let account = await db.account.findOne({ session: session.id })
    if (!account) return null
    return account.toJSON()
}

export async function loginAction(username, password, session) {
    const user = await db.account.findOneAndUpdate(
    {
        username,
        password: sha512(password)
    },
    { session },
    { new: true })

    return user ? user.toJSON() : false
}

export async function registerAction(username, password) {
    const user = new db.account({
        username,
        password: sha512(password)
    })

    await user.save()
    return user.toJSON()
}

/**
 * Hash the password
 * @param str
 * @returns {String}
 */
function sha512(str) {
    return crypto.createHmac('sha512', config.session.salt).update(str).digest('hex')
}
