import logger from 'debug'
import fp from 'lodash/fp'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from '../../configuration/server'
import db from './helpers/database'
import authenticate from './middleware/authorize'
import context from './middleware/context'
import todos from './routes/todos'
import account from './routes/account'
import render from './middleware/render'

const app = express()

// Serve static files
if (fp.size(config.http.static)) {
    fp.map(route => {
        logger('inferno:static')(route.path)
        app.use(route.url, express.static(route.path))
    })(config.http.static)
}

// Settings
app.disable('x-powered-by')
app.use(compression())

// Middleware
app.use(favicon(config.http.favicon))

// Parse POST requests
app.use(bodyParser.json({ limit: '2mb' }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

// Needed for authentication
app.use(cookieParser())
app.use(context)

// Routes
app.use(todos)
app.use(account)
app.use(render)

app.listen(config.http.port, function() {
    logger('server:start')('Listening on port ' + config.http.port)
})
