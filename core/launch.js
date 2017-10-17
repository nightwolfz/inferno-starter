const {spawn} = require('child_process')
const {debounce} = require('lodash')
const args = process.argv.slice(2)

if (args.includes('--dev')) {
  runDevelopment()
}

if (args.includes('--prod') || process.env.NODE_ENV === 'production') {
  runProduction()
}

// On production, we want to kill webpack as soon as it's done
function runProduction() {
  process.env.NODE_ENV = 'production'
  require('./server')

  // Only run once in cluster mode
  if (!parseInt(process.env.NODE_APP_INSTANCE)) {
    spawnChild('./webpack.prod.js')
  }
}

// On development, we keep webpack running and set server as child for restarting
function runDevelopment() {
  process.env.NODE_ENV = 'development'
  let server = spawnChild('./core/server')
  const chokidar = require('chokidar')
  const watcher = chokidar.watch(['./server/**/*.js'])
  const restart = debounce(() => server.kill(), 100)

  server.on('exit', function() {
    console.server('✓ SERVER RESTART')
    server = spawnChild('./core/server')
  })

  require('../webpack.dev.js')
  watcher.on('ready', () => watcher.on('all', restart))
}

function spawnChild(src) {
  return spawn('node', [src], { stdio: 'inherit' })
}
