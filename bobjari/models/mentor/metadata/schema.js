const mongoose = require('mongoose')

const mentorMetaSchema = {
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Mentor ID must be included']
    },
    likeNum: {
        type: Number,
        default: 0,
    },
    reviewNum: {
        type: Number,
        default: 0,
    },
    bobjariNum: {
        type: Number,
        default: 0,
    },
}

module.exports = new mongoose.Schema(
    mentorMetaSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)