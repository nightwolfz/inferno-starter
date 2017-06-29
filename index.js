/**
 * Bootstrap core and webpack
 */
require('./core/logger')
require('./core/polyfills')
require('./core/compile')

/**
 * Bootstrap our server
 */
require('babel-register')
require('./server/server')
