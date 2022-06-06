const mongoose = require('mongoose')

const corpSchema = {
    corp: {
        type: String,
        required: [true, 'Corp name must be included'],
    }
}

module.exports = new mongoose.Schema(
    corpSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
)