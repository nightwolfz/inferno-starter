import logger from 'debug'
import { checkAuthorized } from '../actions/account'

/**
 * Middleware for checking if we're logged in
 * @param req
 * @param res
 * @param next
 */
export default function(req, res, next) {
    checkAuthorized(req.token).then(auth => {
        logger('inferno:authorized')(auth)
        req.authorized = true
        next()
    }).catch(error => {
        if (req.headers['user-agent'].includes('node-fetch')) {
            req.authorized = false
            next()
        } else {
            return res.status(401).send(error)
        }
    })
}


