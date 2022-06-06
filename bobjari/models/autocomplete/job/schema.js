const mongoose = require('mongoose')

const jobSchema = {
    job: {
        type: String,
        required: [true, 'Corp name must be included'],
    }
}

module.exports = new mongoose.Schema(
    jobSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)
