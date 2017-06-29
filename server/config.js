const path = require('path')
const root = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  http: {
    hostname: 'localhost', // Must be set to allow SSR requests
    port: 2000,
    favicon: root('src/assets/favicon.ico'),
    static: {
      '/build': root('build'),
      '/': root('src/assets')
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
