const { data } = require('../config/winston');
const logger = require('../config/winston');
const menteeModel = require('../models/mentee/handler');
const mentorModel = require('../models/mentor/handler');
const User = require('../models/userCommon/handler');
const config = require('../config/index');
const crypto = require('crypto');

// User
exports.createUser = async (data) => {
    try {
        const mentor = await mentorModel.create({
            preference: {
                fee: {
                    select: 1,
                    value: '10000'
                }
            }
        });
        const mentee = await menteeModel.create({
            interests: ['백엔드 개발', '대용량 트래픽 서비스 개발']
        });
        const userData = {
            profile: {
                email: data.email,
                age: data.age,
                gender: data.gender,
                nickname: data.nickname,
            },
            role: data.role,
            searchAllow: true,
            menteeInfo: mentee._id,
            mentorInfo: mentor._id,
        };
        const user = await User.create(userData);
        return user;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.findUserByNickname = async (nickname) => {
    try {
        return await User.findByNickname(nickname)
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.findUserByEmailWithMenteeInfo = async (email) => {
    try {
        return await User.findByEmailWithMenteeInfo(email)
    } catch (err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

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

exports.updateMenteeRole = async (email, curState) => {
    try {
        // Update role by swapping
        let ret = await menteeModel.findOneByEmailAndUpdateRole(email, curState);
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

exports.updateMentorRole = async (email, curState) => {
    try {
        // Update role by swapping
        let ret = await mentorModel.findOneByEmailAndUpdateRole(email, curState);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getMentorByPhone = async (phone) => {
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

exports.updateMentorAllowSearch = async (email, curState) => {
    try {
        let ret = await mentorModel.findOneByEmailAndToggleAllowSearch(email, curState)
        console.log(ret.searchAllow)
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