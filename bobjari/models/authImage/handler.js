let mongoose = require('mongoose');
let authImageSchema = require('./schema');

authImageSchema.pre('validate', function(next) {
    console.log('authImage type : ', this.contentType)
    next();
})

authImageSchema.statics.create = function (payload) {
    const authImage = new this(payload)
    return authImage.save()
}

module.exports =
    mongoose.admin_conn.model('AuthImage', authImageSchema)