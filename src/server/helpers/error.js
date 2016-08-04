/**
 * Flush an error to the browser
 * @param res {Object}
 * @param err {String|Object}
 * @returns {Promise}
 */
export default (res, msg) => {
    res.status(400).send(msg)
}
