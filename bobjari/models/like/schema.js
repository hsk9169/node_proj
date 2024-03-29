const mongoose = require('mongoose')

const likeSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
        required: [true, 'Mentee must be included']
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        required: [true, 'Mentor must be included']
    },
}

module.exports = new mongoose.Schema(
    likeSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)