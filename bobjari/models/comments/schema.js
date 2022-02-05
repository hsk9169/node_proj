let mongoose = require('mongoose')

let commentSchema = {
    updated: {
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
    commentSchema, { collections: 'comment' }
)