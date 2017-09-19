import {debounce} from 'lodash'

const dirs = ['./server/**/*.js']
const args = process.argv.slice(2)
const spawn = (src) => require('child_process').spawn('node', [src], { stdio: 'inherit' })

if (args.includes('--dev')) {
  process.env.NODE_ENV = 'development'
  let server = spawn('./core/server')
  require('../webpack.dev.js')

  // Run server
  const chokidar = require('chokidar')
  const watcher = chokidar.watch(dirs)
  const restart = debounce(function() {
    server.kill()
    server.on('exit', function() {
      console.server('✓ SERVER RESTART')
      server = spawn('./core/server')
    })
  }, 100)

  watcher.on('ready', function() {
    watcher.on('all', restart)
  })
}

if (args.includes('--prod') || process.env.NODE_ENV === 'production') {
  process.env.NODE_ENV = 'production'
  require('./server')

  // Only run once in cluster mode
  if (!parseInt(process.env.NODE_APP_INSTANCE)) {
    spawn('./webpack.prod.js')
  }
}
