const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const root = (dir) => path.join(__dirname, '..', dir)

// We need these globals to fetch data on server-side
global.HOSTNAME = 'localhost'
global.PORT = 2000

module.exports = {
  http: {
    port: global.PORT,
    hostname: global.HOSTNAME,
    favicon: root('src/assets/favicon.ico'),
    static: {
      //'/build': root('build'),
      '/assets': root('src/assets')
    }
  },
  server: {
    DEV: !isProduction,
  },
  session: {
    secret: 'INFERNAL_SECRET_KEY_KERE',
    expires: 2 * 3600 * 1000 // 2 hours
  },
  databases: {
    mongo: 'mongodb://127.0.0.1:27017/inferno-starter'
  }
}
