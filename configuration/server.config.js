const path = require('path')

export default {
    http: {
        port: 2000,
        favicon: path.join(__dirname, '../src/assets/favicon.ico'),
        static: [
            {
                url: '/build', path: path.join(__dirname, '../build')
            }
        ]
    },
    session: {
        salt: 'SUPER_HOT_YES?',
        secret: 'SUPER_HOT_SECRET_KEY_KERE',
        expires: 20 * 60 * 1000 // 20 minutes
    },
    databases: {
        mongo: 'mongodb://127.0.0.1:27017/inferno-todos'
    }
}
