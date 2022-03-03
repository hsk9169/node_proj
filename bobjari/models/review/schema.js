let mongoose = require('mongoose')

let reviewSchema = {
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
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
        required: [true, 'Mentee ID must be included']
    },
    score: {
        type: Number,
        required: [true, 'score must be included']
    },
    body: {
        type: String,
        maxLength: 300,
        default: null,
    },
}

module.exports = new mongoose.Schema(
    reviewSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)