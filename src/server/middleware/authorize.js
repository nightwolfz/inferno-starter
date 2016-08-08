import logger from 'debug'
import jwt from 'jwt-simple'
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
        logger('inferno:req')(req.headers['user-agent'])
        logger('inferno:error')(error)
        logger('inferno:req.headers')(req.headers)
        if (req.headers['user-agent'].includes('node-fetch')) {
            req.authorized = false
            next()
        } else {
            return res.status(401).send(error)
        }
    })
}


