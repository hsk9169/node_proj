const mongoose = require('mongoose')

const chatSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    bobjari: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bobjari',
        required: [true, 'Bobjari ID must be included'],
    },
    message: String,
    author: mongoose.Schema.Types.ObjectId,
}

module.exports = new mongoose.Schema(
    chatSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)