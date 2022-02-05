let mongoose = require('mongoose')

let authImageSchema = {
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    data: mongoose.Schema.Types.Mixed,
    contentType: String,
}

module.exports = new mongoose.Schema(
    authImageSchema, { collection: 'authImage' }
)