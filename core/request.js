const config = require('../server/config')

/**
 * This is our overly complicated isomorphic "request"
 * @param state
 * @returns {Function}
 */
export default {
  get(url, params) {
    return buildRequest('GET', url, params)
  },

  post(url, data, isMultiForm = false) {
    return buildRequest('POST', url, data, isMultiForm)
  }
}

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method, url, params, isMultiForm) {
  const requestURL = createURL(url) + (method === 'GET' && params ? toQueryString(params) : '')
  const request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      token: getCookie('token')
    }
  }

  console.warn(request)

  if (!isMultiForm) {
    request.headers['Content-Type'] = 'application/json'
  }

  if (method === 'POST') {
    if (isMultiForm) {
      const formData = new FormData()
      for(var name in params) {
        formData.append(name, params[name]);
      }
      request.body = formData
    } else {
      request.body = JSON.stringify(params || {})
    }
  }

  return fetch(requestURL, request).then(handleResponse)
}

/**
 * Prepend host of API server
 * @param path
 * @returns {String}
 * @private
 */
function createURL(path) {
  if (process.env.BROWSER) {
    return '/' + path.trimLeft('/')
  } else {
    return `http://${config.http.hostname}/` + path.trimLeft('/')
  }
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response) {
  const redirect = response.headers.get('Location')
  if (process.env.BROWSER && redirect) {
    window.location.replace(redirect)
    return Promise.reject()
  }

  if (response.headers.get('content-type').includes('json')) {
    return response.json().then(res => {
      if (response.ok) {
        if (response.status === 403) {
          console.warn('Unauthorized', response)
        }
        return res
      } else {
        throw res
      }
    })
  }
  return response.text().then(error => { throw error })
}

/**
 * Transform an JSON object to a query string
 * @param params
 * @returns {string}
 */
function toQueryString(params) {
  return '?' + Object.keys(params).map(k => {
    const name = encodeURIComponent(k)
    if (Array.isArray(params[k])) {
      return params[k].map(val => `${name}[]=${encodeURIComponent(val)}`).join('&')
    }
    return `${name}=${encodeURIComponent(params[k])}`
  }).join('&')
}

function getCookie(key) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return cookieValue ? cookieValue.pop() : ''
}
