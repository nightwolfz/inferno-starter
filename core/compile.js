/**
 * Generate client-side bundle
 */
if (process.env.NODE_ENV === 'production') {
  const {spawn} = require('child_process')
  const child = spawn('node', ['webpack.prod.js'])

  // Output stdout to screen
  child.stdout.on('data', data => process.stdout.write(data.toString()))
  child.stderr.on('data', data => process.stdout.write(data.toString()))

  // Exit if children get stuck
  process.on('exit', () => child.kill())

} else {
  process.env.DEV = true
  require('../webpack.dev.js')
}
