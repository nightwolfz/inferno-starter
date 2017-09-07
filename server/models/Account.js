import database from 'core/database'
import { Schema } from 'mongoose'

const schema = new Schema({
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

// Options
schema.set('toJSON', {
  getters: true,
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
  }
})

/**
 * Get account by token
 * @param token {string}
 * @returns {object}
 */
schema.statics.getAccount = async function(token) {
  if (token) {
    const account = await this.findOne({ token }, '+token').populate('profile')
    return account || {}
  }
  return {}
}

export default database.model('Account', schema)
