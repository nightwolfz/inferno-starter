import logger from 'debug'
import mongoose from 'mongoose'
import config from '../config'

// Use native promises
mongoose.Promise = Promise

// Initialize our database
mongoose.connect(config.databases.mongo)

const db = mongoose.connection
db.on('error', (err) => logger('database:error')(err))
db.once('open', () => logger('database:info')(config.databases.mongo))

// Initialize our models
export default {
    connection: db,
    account: db.model('Account', require('../models/Account')),
    todos: db.model('Todo', require('../models/Todo'))
}
