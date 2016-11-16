import database from '../../../core/database'
import { Schema } from 'mongoose'

const schema = new Schema({
    username: { type: String, required: true, unique: true, index: true, trim: true },
    password: { type: String, required: true, select: false },
    token: { type: String, select: false },
    description: { type: String }
})

export default database.model('Account', schema)
