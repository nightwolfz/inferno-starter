const mongoose = require('mongoose')

export default new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true, trim: true },
    password: { type: String, required: true, select: false },
    token: { type: String, select: false },
    description: { type: String }
})
