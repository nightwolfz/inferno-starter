// Enable logging
const logger = require('debug')
const appName = 'app'

// Enable logging
logger.enable(`${appName}:*,server:*,webpack:*`)

if (!process.env.BROWSER) {
    // You might want to use your own logger here.
    console.debug = logger(appName + ':debug').bind(console)
    console.info  = logger(appName + ':info').bind(console)
    console.warn  = logger(appName + ':warn').bind(console)
}
