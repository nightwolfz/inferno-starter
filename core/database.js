import mongoose from 'mongoose'
import config from '../server/config'

// Use native promises
mongoose.Promise = Promise

// Initialize our database
mongoose.connect(config.databases.mongo, {
  useMongoClient: true
})

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.info(config.databases.mongo))

export default db
