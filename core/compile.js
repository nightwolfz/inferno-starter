import {fork} from 'child_process'
import {debounce} from 'lodash'

const dirs = ['./server/**/*.js']
const args = process.argv.slice(2)

if (args.includes('--dev')) {
  process.env.NODE_ENV = 'development'
  let server = fork('./core/server.js')
  require('../webpack.dev.js')

  // Run server
  const chokidar = require('chokidar')
  const watcher = chokidar.watch(dirs)
  const restart = debounce(function() {
    server.kill()
    server.on('exit', function() {
      console.server('✓ SERVER RESTART')
      server = fork('./core/server.js')
    })
  }, 100)

  watcher.on('ready', function() {
    watcher.on('all', restart)
  })
}

if (args.includes('--prod') || process.env.NODE_ENV === 'production') {
  process.env.NODE_ENV = 'production'
  require('./server')
  fork('./webpack.prod.js')
}
