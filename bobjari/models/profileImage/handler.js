let mongoose = require('mongoose');
let profileImageSchema = require('./schema');

profileImageSchema.pre('validate', function(next) {
    console.log('profileImage type : ', this.contentType)
    next();
})

profileImageSchema.statics.create = function (payload) {
    const profileImage = new this(payload)
    return profileImage.save()
}

module.exports =
    mongoose.admin_conn.model('ProfileImage', profileImageSchema)