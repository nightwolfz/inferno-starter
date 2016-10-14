/**
 * Bootstrap our server
 */
require('isomorphic-fetch')
require('./core/console')
require('./core/polyfills')

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./core/webpack.prod.js')
} else {
    process.env.DEV = true
    require('./core/webpack.dev.js')
}

require('babel-register')
require('./src/server/server')

process.on('uncaughtException', console.error.bind(console))
process.on('unhandledRejection', console.error.bind(console))
