const path = require('path')

module.exports = {
    http: {
        port: 2000,
        favicon: path.join(__dirname, 'assets/favicon.ico'),
        static: {
            '/build': path.join(__dirname, '../build'),
            '/': path.join(__dirname, './assets')
        }
    },
    server: {
        SSR: true // Server side rendering
    },
    session: {
        secret: 'INFERNAL_SECRET_KEY_KERE',
        expires: 2 * 3600 * 1000 // 2 hours
    },
    databases: {
        mongo: 'mongodb://127.0.0.1:27017/inferno-starter'
    }
}
