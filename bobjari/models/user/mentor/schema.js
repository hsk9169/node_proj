const { Schema } = require("mongoose");

/* Keys for query
 * 1) user mgmt
 *  - nickname
 *  - phone
 * 2) mentor search
 *  - job
 *  - company
 *  - hash tags
 */


// Define Scehmas
// To Add:
// appointment ID array

const mentorSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    userInfo: {
        email: {
            type: String,
            unique: true,
        },
        age: {
            type: Number,
            max: 80,
        },
        gender: String,
        nickname: {
            type: String,
            unique: true,
        },
    },
    role: String,
    careerInfo: {
        job: [String],
        company: [String],
        topics: [String],
        auth: {
            method: String,
            file: {
                data: Schema.Types.Mixed,
                contentType: String,
            },
        },
        introduce: {
            type: String,
            maxLength: 300,
        },
        hashtags: [String],
    },
    appointment: {
        schedules: [
            {
                day: String,
                startTime: String,
                endTime: String,
            }
        ],
        locations: [
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
            select: Number,
            value: String,
        },
    },
    profileImg: {
        data: Schema.Types.Mixed,
        contentType: String,
    },
};

module.exports = mentorSchema;