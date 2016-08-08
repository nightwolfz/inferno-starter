if (typeof window === 'undefined') {
    // Enable logging
    const appName = 'logger'
    process.env.DEBUG = appName + ':*,server:*'

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
}
