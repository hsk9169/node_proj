let mongoose = require('mongoose')
let userSchema = require('./schema')

userSchema.virtual('mentor', {
    ref: 'Mentor',
    foreignField: 'user',
    localField: '_id',
    justOne: true,
})

userSchema.virtual('mentee', {
    ref: 'Mentee',
    foreignField: 'user',
    localField: '_id',
    justOne: true,
})

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
    const ret = this.findOne({'profile.email': query})
                    .populate({
                        path: 'mentor',
                        populate: {
                            path: 'metadata details',
                        }
                    })
                    .populate({
                        path: 'mentee',
                        populate: {
                            path: 'metadata',
                        }
                    })
    return ret
}

// Change Role
userSchema.statics.changeRoleByEmail = function (email, role) {
    const query = new RegExp('^'+email+'$', 'i')
    return this.findOneAndUpdate(
                    {'profile.email': query},
                    {'role': role},
                    {new: true},
                )
                .exec()
}

// Toggle Search Allow Flag
userSchema.statics.toggleSearchAllowByEmail = function (email, curState) {
    const query = new RegExp('^'+email+'$', 'i')
    return this.findOneAndUpdate(
                    {'profile.email': query},
                    {'searchAllow': !curState},
                    {new: true},
                )
                .exec()
}

module.exports = 
    mongoose.admin_conn.model('User', userSchema);