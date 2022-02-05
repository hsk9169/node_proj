const { data } = require('../config/winston');
const logger = require('../config/winston');
const menteeModel = require('../models/mentee/handler');
const mentorModel = require('../models/mentor/handler');
const profileImageModel = require('../models/profileImage/handler')
const authImageModel = require('../models/authImage/handler')
const userModel = require('../models/userCommon/handler');
const config = require('../config/index');
const crypto = require('crypto');

// User
exports.createUser = async (data, files) => {
    try {
        let authImage, mentee, mentor, profileImage
        try {
            authImage = await authImageModel.create({
                data: (files.auth!==null ?
                    files.auth.buffer : null),
                contentType: (files.auth!==null ?
                    files.auth.mimetype : ''),
            })
        } catch {
            authImage = await authImageModel.create()
        }

        try {
            mentor = await mentorModel.create({
                career: {
                    job:        data.job,
                    company:    data.company,
                    years:      data.years,
                    topics:     data.topics,
                    auth: {
                        method: data.authSelect,
                        isAuth: data.isAuth,
                        file: authImage._id,
                    },
                    title:      data.title,
                    introduce:  data.introduce,
                    hashtags: [],
                },
                preference: {
                    schedule:   data.schedules,
                    location:   data.cafes,
                    fee: {
                        select: data.feeSelect,
                        value:  data.fee,
                    }
                }
            });
        } catch {
            mentor = await mentorModel.create()
        }

        try {
            mentee = await menteeModel.create({
                interests: data.interests,
            });
        } catch {
            mentee = await menteeModel.create()
        }

        try {
            profileImage = await profileImageModel.create({
                data: (files.img!==null ?
                    files.img.buffer : data.img),
                contentType: (files.img!==null ?
                    files.img.mimetype : 'url'),
            })
        } catch {
            profileImage = await profileImageModel.create()
        }

        const userData = {
            profile: {
                email:      data.email,
                age:        data.age,
                gender:     data.gender,
                nickname:   data.nickname,
            },
            role: data.role,
            mentee: mentee._id,
            mentor: mentor._id,
            profileImage: profileImage._id,
        };
        const user = await userModel.create(userData);
        return user;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.findUserByNickname = async (nickname) => {
    try {
        return await userModel.findByNickname(nickname)
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUserByEmailWithDetails = async (email) => {
    try {
        return await userModel.findByEmailWithDetails(email)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
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

exports.getMentors = async (keyword, startIdx, num) => {
    try {
        let data = await userModel.findAll(keyword, startIdx, num);
        return data;
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