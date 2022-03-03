const mongoose = require('mongoose')

const mentorMetaSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        required: [true, 'Mentor ID must be included']
    },
    numNews: {
        type: Number,
        default: 0,
    },
    numBobjari: {
        type: Number,
        default: 0,
    },
    rate: {
        score: {
            type: Number,
            default: 0,
        },
        num: {
            type: Number,
            default: 0,
        },
    },
}

module.exports = new mongoose.Schema(
    mentorMetaSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)