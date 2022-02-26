let mongoose = require('mongoose')
let chatSchema = require('./schema')

chatSchema.index({createdAt: -1})

chatSchema.statics.create = function (payload) {
    const chat = new this(payload)
    return chat.save()
}

chatSchema.statics.getByDateWithStep = function (bobjariId, startIdx, num) {
    return this.find({bobjari: bobjariId})
                .sort({createdAt: -1})
                .skip(Number(startIdx))
                .limit(Number(num))
                .exec()
}

module.exports =
    mongoose.admin_conn.model('Chat', chatSchema)