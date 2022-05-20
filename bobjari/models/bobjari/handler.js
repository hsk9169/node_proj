const mongoose = require('mongoose');
const bobjariSchema = require('./schema');
const assert = require('assert')

bobjariSchema.virtual('chat', {
    ref: 'Chat',
    foreignField: 'bobjari',
    localField: '_id',
    justOne: true,
})

//------------ Static Properties ------------//
// Create new bobjari document
bobjariSchema.statics.create = function (payload) {
    // this === Model
    const bobjari = new this(payload);
    // return Promise
    return bobjari.save();
};

// Find One by menteeid
bobjariSchema.statics.getListByMenteeId = function (menteeId) {
    return this.find({ 'mentee': menteeId })
                .populate({
                    path: 'mentor',
                    populate: 'userDetail',
                })
                .populate({
                    path: 'chat',
                    select: 'message createdAt',
                    options: {
                        sort: {createdAt: -1},
                    },
                })
                .sort({updatedAt: -1})
                .exec()
};

// Find One by mentorid
bobjariSchema.statics.getListByMentorId = function (mentorId) {
    return this.find({ 'mentor': mentorId })
                .populate({
                    path: 'mentee',
                    populate: 'userDetail'
                })
                .populate({
                    path: 'chat',
                    select: 'message createdAt',
                    options: {
                        sort: {createdAt: -1},
                    }
                })
                .sort({updatedAt: -1})
                .exec()
};

// Get all Data for Entering the Chat Room
bobjariSchema.statics.getRoomByBobjariId = function (bobjariId) {
    return this.findByBobjariId(bobjariId)
                .populate('mentee mentor')
                .populate({
                    path: 'chat',
                    options: {
                        limit: 10,
                        sort: {createdAt: -1},
                    }
                })
                .exec()
}

bobjariSchema.statics.updateDate = function (bobjariId, datetime) {
    return this.findByIdAndUpdate(bobjariId,
                                {'updatedAt': datetime},
                                {new: true})
} 

// Update by bobjariId
bobjariSchema.statics.updateLevel = function (bobjariId, level) {
    return this.findByIdAndUpdate(bobjariId, 
                                {'status': level}, 
                                { new: true });
};

// Delete by bobjariId
bobjariSchema.statics.removeById = function (bobjariId) {
    return this.findByIdAndDelete(bobjariId);
};

module.exports = 
    mongoose.admin_conn.model('Bobjari', bobjariSchema)