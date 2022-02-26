const mongoose = require('mongoose')

const menteeMetaSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Mentee ID must be included']
    },
    searchKeyword: [String],
}

module.exports = new mongoose.Schema(
    menteeMetaSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)