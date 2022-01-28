let mongoose = require('mongoose')

let preferenceSchema = {
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
        select: Number,
        value: String,
    },
}

module.exports = new mongoose.Schema(preferenceSchema)