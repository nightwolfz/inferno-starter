import mongoose from 'mongoose'
import config from '../../../configuration/server.config'

// Use bluebird
mongoose.Promise = global.Promise

// Initialize our database
mongoose.connect(config.databases.mongo)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongodb error:'))
db.once('open', console.info.bind(console, 'Mongodb started on port 27017'))

// Initialize our models
export default {
    connection: db,
    session: db.model('Session', require('../models/Session')),
    account: db.model('Account', require('../models/Account')),
    todos: db.model('Todo', require('../models/Todo'))
}
