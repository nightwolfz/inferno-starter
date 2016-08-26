// Enable logging
const appName = 'starter'

if (process.env.BROWSER) {
    const logger = require('debug')
    // Enable logging
    logger.enable(`${appName}:*,server:*`)
} else {
    // Enable logging
    process.env.DEBUG = `${appName}:*,server:*`

    if (process.env.NODE_ENV !== 'production') {
        // Let's add some colors to our console.
        // You might want to use your own logger here.
        const logger = require('debug')
        const debug = logger(appName + ':debug')
        const info  = logger(appName + ':info')
        const warn  = logger(appName + ':warn')
        const error = logger(appName + ':error')

        // Bind methods
        console.debug = debug.bind(console);
        console.info = info.bind(console);
        console.warn = warn.bind(console);
        console.error = error.bind(console);
    } else {
        // Make sure debug exists
        console.debug = console.info.bind(console);
    }
}
