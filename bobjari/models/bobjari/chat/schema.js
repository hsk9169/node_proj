const mongoose = require('mongoose')

const chatSchema = {
    updated: {
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
    user: mongoose.Schema.Types.ObjectId,
    isRead: {
        type: Boolean,
        default: false,
    },
}

module.exports = new mongoose.Schema(
    chatSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)