const mongoose = require('mongoose')

const likeSchema = {
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Mentee must be included']
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Mentor must be included']
    },
}

module.exports = new mongoose.Schema(
    likeSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)