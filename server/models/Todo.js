const database = require('core/database')
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: String,
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
})

export default database.model('Todo', schema)
