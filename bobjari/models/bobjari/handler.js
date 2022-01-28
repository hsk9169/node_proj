const mongoose = require('mongoose');
const menteeSchema = require('./schema');
const assert = require('assert')

const menteeModel = new mongoose.Schema(
                        menteeSchema, {
                            collection: 'menteeinfos',
                        });

//------------ Static Properties ------------//
// Create new mentee document
menteeModel.statics.create = function (payload) {
    // this === Model
    const mentee = new this(payload);
    // return Promise
    return mentee.save();
};

// Find All
menteeModel.statics.findAll = function () {
    // return promise
    return this.find({});
};

// Find One by menteeid
menteeModel.statics.findOneByMenteeid = function (menteeid) {
    return this.findOne({ menteeid });
};

// Update by menteeid
menteeModel.statics.updateByMenteeid = function (menteeid, payload) {
    // {new: true }: return the modified document 
    // rather than the original. defaults to false
    return this.findOneAndUpdate({ menteeid }, payload, { new: true });
};

// Delete by menteeid
menteeModel.statics.deleteByMenteeid = function (menteeid) {
    return this.deleteOne({ menteeid });
};

// Find By mentee email
menteeModel.statics.findOneByEmail = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.email': query } ).exec();
};

// Find By mentee phone number
menteeModel.statics.findOneByPhone = function(target, cb) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.phone': query } ).exec();
};

// Find By mentee nickname
menteeModel.statics.findOneByNickname = function (target) {
    const query = new RegExp('^'+target+'$', 'i');
    return this.findOne( { 'userInfo.nickname': query } ).exec();
};

// Create Model & Export
module.exports = mongoose.admin_conn.model('Mentee', menteeModel);