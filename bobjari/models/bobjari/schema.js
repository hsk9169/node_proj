const mongoose = require("mongoose");

const bobjariSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
        required: [true, 'Mentee ID must be included']
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        required: [true, 'Mentor ID must be included']
    },
    status: {
        // 1 : waiting mentor to accept
        // 2 : mentor accepted
        // 3 : confirmed each other
        // 4 : accomplished
        // 0 : declined from mentor
        type: Number,
        default: 1,
    },
    appointment: {
        schedule: [
            {
                day: String,
                startTime: String,
                endTime: String,
            }
        ],
        location: [
            {
                place_name: String,
                address_name: String,
                road_address_name: String,
                category_group_name: String,
                content_id: String,
                place_url: String,
                phone: String,
                geolocation: {
                    x: String,
                    y: String,
                    distance: String,
                }
            }
        ],
        fee: {
            select: {
                type: Number,
                default: null,
            },
            value: {
                type: String,
                default: '0',
            },
        },
    }
}

module.exports = new mongoose.Schema(
    bobjariSchema,
    {toJSON: {virtuals: true}, toObject: {virtuals: true}}
);