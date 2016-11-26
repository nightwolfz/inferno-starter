/**
 * Bootstrap core and webpack
 */
require('./core/compile')

/**
 * Bootstrap our server
 */
require('babel-register')
require('./src/server/server')
