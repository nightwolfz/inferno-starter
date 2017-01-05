import logger from 'debug'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'
import compress from 'koa-compress'

import config from '../config'
import context from './middleware/context'
import catcher from './middleware/catcher'
import render from './middleware/render'
import account from './routes/account'
import todos from './routes/todos'

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
app.use(todos.routes())
app.use(account.routes())

// Serve static files
Object.keys(config.http.static).forEach(staticURL => {
    logger('app:static')(staticURL)
    app.use(mount(staticURL, convert(serve(config.http.static[staticURL]))))
})

app.use(render)

app.listen(config.http.port, function() {
    logger('app:start')('Listening on port ' + config.http.port)
})
