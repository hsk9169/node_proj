let mongoose = require('mongoose')
let userSchema = require('./schema')

userSchema.statics.create = function (payload) {
    const user = new this(payload);
    return user.save();
}

userSchema.statics.findByNickname = function (nickname) {
    const query = new RegExp('^'+nickname+'$', 'i');
    return this.findOne( {'profile.nickname': query} )
                .exec();
}

userSchema.statics.findByEmailWithMenteeInfo = function (email) {
    const query = new RegExp('^'+email+'$', 'i');
    return this.findOne( {'profile.email': query} )
                .populate('menteeInfo')
                .exec()
}

module.exports = 
    mongoose.admin_conn.model('User', userSchema);