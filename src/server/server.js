import logger from 'debug'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'

import config from './config'
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

// Needed for authentication
app.use(catcher)
app.use(context)

// Routes
app.use(todos.routes())
app.use(account.routes())
app.use(render)

// Serve static files
config.http.static.forEach(staticRoute => {
    logger('app:static')(staticRoute.path)
    app.use(mount(staticRoute.url, convert(serve(staticRoute.path))))
})

app.listen(config.http.port, function() {
    logger('app:start')('Listening on port ' + config.http.port)
})
