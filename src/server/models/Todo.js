const mongoose = require('mongoose')

export default new mongoose.Schema({
    text: String,
    image: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
})
