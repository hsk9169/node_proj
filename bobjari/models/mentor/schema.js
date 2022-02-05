const mongoose = require("mongoose");

const mentorSchema = {
    updated: { 
        type: Date,
        required: true,
        default: Date.now,
    },
    //lastVisited: {
    //    type: Date,
    //    required: true,
    //},
    career: {
        job: [String],
        company: [String],
        years: {
            type: Number,
            default: null,
        },
        topics: [Number],
        auth: {
            method: {
                type: String,
                default: null,
            },
            isAuth: {
                type: Boolean,
                default: false,
            },
            file: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AuthImage',
            },
        },
        title: {
            type: String,
            maxLength: 30,
            default: null,
        },
        introduce: {
            type: String,
            maxLength: 300,
            default: null,
        },
        hashtags: [String],
    },
    preference: {
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
    },
};

module.exports = new mongoose.Schema(
    mentorSchema, { collection: 'mentorinfo' } 
);
