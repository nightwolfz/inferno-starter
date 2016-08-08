import logger from 'debug'
import fp from 'lodash/fp'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import config from '../../configuration/server.config'
import db from './helpers/database'
import authenticate from './middleware/authorize'
import context from './middleware/context'
import todos from './routes/todos'
import account from './routes/account'
import render from './middleware/render'

const app = express()
//const MongoStore from 'connect-mongo')(session)

// Serve static files
if (fp.size(config.http.static)) {
    fp.map(route => {
        console.debug('[Static] %s -', route.url, route.path)
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
app.use(cookieParser())

// Enable sessions
/*app.use(session({
    secret: config.session.secret,
    //store: new MongoStore({ mongooseConnection: db.connection }),
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
}))*/

app.use(context)
app.use(function(req, res, next) {
    //logger('inferno:session')(req.session + ' [request] ' + req.originalUrl)
    next()
})

// Routes
app.use(todos)
app.use(account)
app.use(render)

app.listen(config.http.port, function() {
    console.info('HTTP Server listening on port', config.http.port)
})
