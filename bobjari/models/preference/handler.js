let mongoose = require('mongoose')
let preferenceSchema = require('../preference/schema')

preferenceSchema.pre('validate', function(next) {
    console.log('schedule', this.schedule)
    console.log('location', this.location)
    console.log('fee', this.fee)
})

module.exports = 
    mongoose.config_conn.model('Preference', preferenceSchema)