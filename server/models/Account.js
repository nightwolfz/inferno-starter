const database = require('core/database')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  token: {
    type: String,
    select: false
  },
  description: { type: String }
})

export default database.model('Account', schema)
