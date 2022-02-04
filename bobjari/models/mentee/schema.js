let mongoose = require("mongoose");

let menteeSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    lastVisited: {
        type: Date,
        required: true,
    },
    interests: [String],
};

module.exports = new mongoose.Schema(
    menteeSchema, { collections: 'menteeinfo' }
);