const { data } = require('../config/winston');
const logger = require('../config/winston');
const menteeModel = require('../models/user/mentee/handler');
const mentorModel = require('../models/user/mentor/handler');
const config = require('../config/index');
const crypto = require('crypto');

// Mentee
exports.createMentee = async (data) => {
    try {
        const profile = await menteeModel.create(data);
        return profile;
    } catch(err) { 
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentees = async () => {
    try {
        let data = await menteeModel.findAll();
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMenteeByEmail = async(email) => {
    try {
        let ret = await menteeModel.findOneByEmail(email);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMenteeByPhone = async(phone) => {
    try {
        let ret = await menteeModel.findOneByPhone(phone);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMenteeByNickname = async (nickname) => {
    try {
        let ret = await menteeModel.findOneByNickname(nickname);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

// Mentor
exports.createMentor = async (data) => {
    try {
        const profile = await mentorModel.create(data);
        return profile;
    } catch(err) { 
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentors = async (keyword, startIdx, num) => {
    try {
        let data = await mentorModel.findAll(keyword, startIdx, num);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentorByEmail = async(email) => {
    try {
        let ret = await mentorModel.findOneByEmail(email);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentorByPhone = async(phone) => {
    try {
        let ret = await mentorModel.findOneByPhone(phone);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentorByNickname = async (nickname) => {
    try {
        let ret = await mentorModel.findOneByNickname(nickname);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentorLength = async () => {
    try {
        let ret = await mentorModel.count();
        return ret
    } catch(err) {
        logger.error(err.stack);
        throw Error(err)
    }
}