/**
 * Bootstrap our server
 */
require('isomorphic-fetch')
require('./core/logger')
require('./core/polyfills')

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./core/webpack/webpack.prod.js')
} else {
    process.env.DEV = true
    require('./core/webpack/webpack.dev.js')
}

require('babel-register')
require('./src/server/server')
