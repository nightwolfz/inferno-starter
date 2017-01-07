/**
 * This is our overly complicated isomorphic "request"
 * @param state
 * @returns {Function}
 */
export default (hostname, token) => {
    return function(url, body, postForm = false) {
        const requestURL = createURL(hostname, url)
        const requestToken = process.env.BROWSER ? getCookie('token') : token
        const requestOptions = {
            credentials: 'include',
            headers: {}
        }
        if (body && postForm) {
            let formData = new FormData()
            Object.keys(body).forEach(field => {
                formData.append(field, body[field])
            })
            requestOptions.method = 'POST'
            requestOptions.body = formData
        } else if (body) {
            requestOptions.method = 'POST'
            requestOptions.body = JSON.stringify(body)
            requestOptions.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        // Append token to the headers
        requestOptions.headers.token = requestToken

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
        return '/' + path.trimLeft('/')
    } else {
        return `http://${hostname}/` + path.trimLeft('/')
    }
}

/**
 * Parse response
 * @param resp
 * @returns {Promise}
 * @private
 */
function handleResponse(resp) {
    const redirect = resp.headers.get('Location')
    if (redirect && process.env.BROWSER) {
        window.browserHistory.push(redirect)
        return Promise.reject()
    }

    const contentType = resp.headers && resp.headers.get('Content-Type')
    const isJSON = contentType && contentType.includes('json')
    const response = resp[isJSON ? 'json' : 'text']()

    return resp.ok ? response : response.then(err => {
        throw err
    })
}

function getCookie(key) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
    return cookieValue ? cookieValue.pop() : ''
}
