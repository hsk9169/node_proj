let mongoose = require('mongoose')

let profileImageSchema = {
    updated: {
        type: Date,
        required: true,
        default: Date.now,
    },
    data: mongoose.Schema.Types.Mixed,
    contentType: String,
}

module.exports = new mongoose.Schema(
    profileImageSchema, { collection: 'profileImage' }
)