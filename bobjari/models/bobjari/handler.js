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
                .populate('mentee')
                .exec()
};

// Find One by mentorid
bobjariSchema.statics.getListByMentorId = function (mentorId) {
    return this.find({ 'mentor': mentorId })
                .populate('mentor')
                .exec()
};

// Update by bobjariId
bobjariSchema.statics.updateLevel = function (bobjariId, level) {
    return this.findByIdAndUpdate(bobjariId, 
                                {'level': level}, 
                                { new: true });
};

// Get all Data for Entering the Chat Room
bobjariSchema.statics.getRoomByBobjariId = function (bobjariId) {
    return this.findByBobjariId(bobjariId)
                .populate('mentee mentor')
                .populate('chat')
                .exec()
}

// Delete by bobjariId
bobjariSchema.statics.removeById = function (bobjariId) {
    return this.findByIdAndDelete(bobjariId);
};

module.exports = 
    mongoose.admin_conn.model('Bobjari', bobjariSchema)