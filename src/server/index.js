const fp = require('lodash/fp')
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const favicon = require('serve-favicon')
const compression = require('compression')
const passport = require('passport')
const config = require('../../configuration/server.config')
const db = require('./helpers/database')
const todos = require('./routes/todos')
const account = require('./routes/account')
const render = require('./routes/render')

const app = express()
const MongoStore = connectMongo(session)

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

// Enable sessions
app.use(session({
    secret: config.session.secret,
    store: new MongoStore({ mongooseConnection: db.connection }),
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(todos)
app.use(account)
app.use(render)

app.listen(config.http.port, function() {
    console.info('HTTP Server listening on port', config.http.port)
})
