/**
 * Bootstrap core and webpack
 */
require('./core/helpers/logger')
require('./core/helpers/polyfills')
require('./core/compile')

/**
 * Bootstrap our server
 */
require('babel-register')
require('./src/server/server')
