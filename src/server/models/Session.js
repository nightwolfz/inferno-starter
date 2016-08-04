const mongoose = require('mongoose')

export default new mongoose.Schema({
    _id: { type: String, required: true, unique: true, select: true },
    data: { type: Object }
})

