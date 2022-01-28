const mongoose = require("mongoose");

 
// Define Scehmas
// location, schedule, ...
// Mentor, Mentee shares this schema

const appointmentModel = new mongoose.Schema({
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    apmtId: Number,
}, { collection: 'appointmentinfos'} );

module.exports = appointmentModel;