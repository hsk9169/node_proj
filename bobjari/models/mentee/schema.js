let mongoose = require("mongoose");

let menteeSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    interests: [String],
};

module.exports = new mongoose.Schema(
    menteeSchema, { collections: 'menteeinfo' }
);