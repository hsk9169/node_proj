let mongoose = require('mongoose')
let jobSchema = require('./schema')

jobSchema.statics.create = function (payload) {
    const job = new this(payload)
    return job.save()
}

jobSchema.statics.findByKeyword = async function(keyword, num) {
    const query = new RegExp(keyword, 'gi')
    return this.find({'job': query})
                .limit(Number(num))
                .exec()
}

module.exports = mongoose.admin_conn.model('Job', jobSchema)