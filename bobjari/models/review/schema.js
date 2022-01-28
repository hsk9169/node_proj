let mongoose = require('mongoose')

let reviewSchema = {
    updated: {
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
    },
    body: {
        type: String,
        maxLength: 300,
    },
}

module.exports = new mongoose.Schema(
    reviewSchema, { collections: 'review' }
)