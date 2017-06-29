import Koa from 'koa'
import bodyParser from 'koa-better-body'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'
import compress from 'koa-compress'
import config from './config'
import context from './middleware/context'
import catcher from './middleware/catcher'
import render from './middleware/render'
import routes from './routes'

const app = new Koa()

// Middleware
app.use(favicon(config.http.favicon))
app.use(convert(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
})))
app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(catcher)
app.use(context)

// Routes
app.use(routes.routes())

// Serve static files
if (process.env.NODE_ENV !== 'production') {
  const mount = require('koa-mount')
  const serve = require( 'koa-static')
  // Serve static files
  for(const staticURL in config.http.static) {
    console.info(staticURL)
    app.use(mount(staticURL, convert(serve(config.http.static[staticURL]))))
  }
}

app.use(render)

app.listen(config.http.port, function() {
  console.info('Listening on port ' + config.http.port)
})
