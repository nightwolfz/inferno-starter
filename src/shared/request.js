import trimStart from 'lodash/fp/trimStart'

/**
 * This is our overly complicated isomorphic "request"
 * @param state
 * @returns {Function}
 */
export default (state) => {
    return function(url, body) {
        const requestURL = createURL(state.app.hostname, url)
        const requestToken = process.env.BROWSER ? getCookie('token') : state.token
        const requestOptions = {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': requestToken
            }
        }
        if (body) {
            requestOptions.method = 'POST'
            requestOptions.body = JSON.stringify(body)
        }

        return fetch(requestURL, requestOptions).then(handleResponse)
    }
}

/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(hostname, path) {
    if (process.env.BROWSER) {
        return trimStart(path, '/')
    } else {
        return `http://${hostname}/` + trimStart(path, '/')
    }
}

/**
 * Parse response
 * @param resp
 * @returns {Promise}
 * @private
 */
function handleResponse(resp) {
    const isJSON = resp.headers && resp.headers.get('Content-Type').includes('json');
    const response = resp[isJSON ? 'json' : 'text']();

    return resp.ok ? response : response.then(err => {throw err});
}

function getCookie(key) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
}
