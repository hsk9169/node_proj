let mongoose = require('mongoose')

let reviewSchema = {
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    },
    menteeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
    },
    title: {
        type: String,
        maxLength: 30,
        default: null,
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