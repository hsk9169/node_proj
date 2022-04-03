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
    return this.findOne({'profile.email': query})
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
                    }).exec()
    return ret
}

// Get User Data with Details
userSchema.statics.findByPhoneWithDetails = function (phone) {
    const query = new RegExp('^'+phone+'$', 'i')
    return this.findOne({'profile.phone': query})
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
                    }).exec()
    return ret
}

// Change Role
userSchema.statics.changeRoleById = function (userId, role) {
    return this.findByIdAndUpdate(
                    userId,
                    {'role': role},
                    {new: true},
                ).exec()
}

userSchema.statics.removeById = function (userId) {
    return this.removeById(userId).exec()
}

module.exports = 
    mongoose.admin_conn.model('User', userSchema);