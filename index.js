/**
 * Bootstrap our server
 */
const sourceMaps = require('source-map-support')
sourceMaps.install()

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    const spawn = require('child_process').spawn
    const child = spawn('node', [path.join(__dirname, 'configuration/webpack.prod.js')])
    // Output stdout to screen
    child.stdout.on('data', data => process.stdout.write(data.toString()) )
    child.stderr.on('data', data => process.stderr.write(data.toString()) )

    // Exit if children get stuck
    process.on('exit', () => child.kill())
} else {
    require('./configuration/webpack.dev.js')
}

// Ensure we're using the server babel settings
process.env.BABEL_ENV = 'server';

require('isomorphic-fetch')
require('babel-register')
require('babel-runtime/core-js/promise').default = require('bluebird')
require('./src/shared/console')
require('./src/shared/polyfills')
require('./src/server/server')

process.on('unhandledRejection', console.error.bind(console))

