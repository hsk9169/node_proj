let mongoose = require('mongoose')

let commentSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
    },
    body: {
        type: String,
        maxLength: 100,
        default: null,
    },
}

module.exports = new mongoose.Schema(
    commentSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)