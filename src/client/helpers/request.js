export default (state) => {
    return function(url, body) {
        console.info(`Fetching: ${url}`)

        const options = { credentials: 'include' }
        if (body) {
            options.method = 'POST'
            options.body = JSON.stringify(body)
            options.headers = {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`http://${state.app.hostname}/${url}`, options)
        .then(handleResponse)
    }
}

/**
 * Parse response
 * @param resp
 * @returns {Promise.<T>|Promise<U>|*}
 * @private
 */
function handleResponse(resp) {
    const isJSON = resp.headers && resp.headers.get('Content-Type').includes('json');
    const response = resp[isJSON ? 'json' : 'text']();

    return resp.ok ? response : response.then(err => {throw err});
}
