let mongoose = require('mongoose')

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
    agreement: {
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
    appointmentSchema, { collections: 'appointmentInfo' }
)