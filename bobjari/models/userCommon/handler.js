let mongoose = require('mongoose')
let userSchema = require('./schema')

// Create User with Role
userSchema.statics.create = function (payload) {
    const user = new this(payload);
    return user.save();
}

// Check Nickname Duplication
userSchema.statics.findByNickname = function (nickname) {
    const query = new RegExp('^'+nickname+'$', 'i');
    return this.findOne({'profile.nickname': query})
                .exec();
}

// Get User Data with Details
userSchema.statics.findByEmailWithDetails = function (email) {
    const query = new RegExp('^'+email+'$', 'i')
    return this.findOne({'profile.email': query})
                .populate(['mentee','mentor','profileImage'])
                .exec()
}

// Find Mentor by Keywords


module.exports = 
    mongoose.admin_conn.model('User', userSchema);