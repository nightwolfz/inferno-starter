import logger from 'debug'
import mongoose from 'mongoose'
import config from '../src/server/config'

// Use native promises
mongoose.Promise = Promise

// Initialize our database
mongoose.connect(config.databases.mongo)

const db = mongoose.connection
db.on('error', (err) => logger('database:error')(err))
db.once('open', () => logger('database:info')(config.databases.mongo))

export default db
