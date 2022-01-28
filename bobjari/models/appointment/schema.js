let mongoose = require('mongoose')
let preferenceSchema = require('../preference/schema')

let appointmentSchema = {
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
    },
    agreement: preferenceSchema,
}

module.exports = new mongoose.Schema(
    appointmentSchema, { collections: 'appointmentInfo' }
)