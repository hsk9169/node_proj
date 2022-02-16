const mongoose = require('mongoose')
const chatSchema = require('./schema')

chatSchema.statics.create = function (payload) {
    const chat = new this(payload)
    return chat.save()
}

// Get additional Messages WITHIN the Room
chatSchema.statics.getByDateWithStep = function (bobjariId, startIdx, num) {
    return this.findById(bobjariId)
                .sort({updated: -1})
                .skip(Number(startIdx))
                .limit(Number(num))
                .exec()
}

module.exports =
    mongoose.admin_conn.model('Chat', chatSchema)