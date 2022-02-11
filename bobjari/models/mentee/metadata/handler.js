let mongoose = require('mongoose')
let menteeMetaSchema = require('./schema')

menteeMetaSchema.statics.create = function (payload) {
    const menteeMeta = new this(payload)
    return menteeMeta.save()
}

module.exports =
    mongoose.admin_conn.model('MenteeMeta', menteeMetaSchema)