let mongoose = require('mongoose')
let corpSchema = require('./schema')

corpSchema.statics.create = function (payload) {
    const corp = new this(payload)
    return corp.save()
}

corpSchema.statics.findByKeyword = function(keyword, num) {
    const query = new RegExp(keyword, 'gi')
    return this.find({'corp': query})
                .limit(Number(num))
                .exec()
}

// Create Model & Export
module.exports = 
    mongoose.admin_conn.model('Corp', corpSchema);