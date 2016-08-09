/**
 * Bootstrap our server
 */
const sourceMaps = require('source-map-support')
sourceMaps.install()

require('./src/shared/console')

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./configuration/webpack.prod.js')
} else {
    require('./configuration/webpack.dev.js')
}

require('isomorphic-fetch')
require('babel-register')
require('./src/shared/polyfills')
require('./src/server/server')

process.on('unhandledRejection', console.error.bind(console))

