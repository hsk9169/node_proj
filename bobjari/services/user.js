const { data } = require('../config/winston');
const logger = require('../config/winston');
const menteeModel = require('../models/mentee/handler');
const mentorModel = require('../models/mentor/handler');
const mentorDetailsModel = require('../models/mentor/details/handler');
const menteeMetaModel = require('../models/mentee/metadata/handler')
const mentorMetaModel = require('../models/mentor/metadata/handler')
const userModel = require('../models/userCommon/handler');
const config = require('../config/index');

// User
exports.createUser = async (data, files) => {
    try {
        let mentee, mentor, mentorDetails, menteeMeta, mentorMeta
        const userData = { 
            profile: {
                email: data.email !== '' ? data.email : null,
                phone: data.phone !== '' ? data.phone : null,
                age: data.age === undefined ? null : data.age,
                gender: data.gender === undefined ? null : data.gender,
                nickname: data.nickname === undefined ? null : data.nickname,
                image: {
                    data: (files.img !== null ?
                        files.img.buffer : data.img),
                    contentType: (files.img !== null ?
                        files.img.mimetype : 'url'),
                },
            },
            role: data.role === undefined ? null : data.role,
            deviceToken: data.deviceToken === undefined ? null : data.deviceToken,
        };
        const user = await userModel.create(userData);

/*
        try {
            mentor = await mentorModel.create({
                user: user._id,
                career: {
                    job: data.job,
                    company: data.company,
                    years: data.years,
                    topics: data.topics,
                    auth: {
                        method: data.authSelect,
                        isAuth: data.isAuth,
                    },
                },
                title: data.title,
                hashtags: [],
            });
        } catch {
            mentor = await mentorModel.create({
                user: user._id,
            })
        }
*/

        mentor = await mentorModel.create({
            userId: user._id,
            userDetail: user._id,
            career: {
                job: data.job === undefined ? null : data.job,
                company: data.company === undefined ? null : data.company,
                years: data.years === undefined ? null : data.years,
                topics: data.topics === undefined ? null : data.topics,
                auth: {
                    method: data.authSelect === undefined ? null : data.authSelect,
                    isAuth: data.isAuth === undefined ? null : data.isAuth,
                },
            },
            title: data.title === undefined ? null : data.title,
            hashtags: data.hashtags === undefined ? null : data.hashtags,
        })
/*
        try {
            mentorDetails = await mentorDetailsModel.create({
                mentor: mentor._id,
                introduce: data.introduce,
                preference: {
                    schedule: data.schedules,
                    location: data.cafes,
                    fee: {
                        select: data.feeSelect,
                        value: data.fee,
                    }
                }
            })
        } catch {
            mentorDetails = await mentorDetailsModel.create({
                mentor: mentor._id,
            })
        }
*/

        mentorDetails = await mentorDetailsModel.create({
            mentor: mentor._id,
            introduce: data.introduce === undefined ? null : data.introduce,
            preference: {
                schedule: data.schedules === undefined ? null : data.schedules,
                location: data.cafes === undefined ? null : data.cafes,
                fee: {
                    select: data.feeSelect === undefined ? null : data.feeSelect,
                    value: data.fee === undefined ? null : data.fee,
                }
            }
        })
/*
        try {
            mentee = await menteeModel.create({
                user: user._id,
                interests: (data.interests === undefined ? null : data.interests),
            });
        } catch {
            mentee = await menteeModel.create({
                user: user._id,
            })
        }
*/

        mentee = await menteeModel.create({
            userId: user._id,
            userDetail: user._id,
            interests: data.interests === undefined ? null : data.interests,
        });

        menteeMeta = await menteeMetaModel.create({
            mentee: mentee._id,
        })

        mentorMeta = await mentorMetaModel.create({
            mentor: mentor._id,
    })
        
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

exports.getUserByPhoneWithDetails = async (phone) => {
    try {
        return await userModel.findByPhoneWithDetails(phone)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.changeUserRoleById = async (curRole, userId) => {
    let role
    if (curRole === 'mentee') role = 'mentor'
    else role = 'mentee'
    try {
        return await userModel.changeRoleById(userId, role)
    } catch (err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.removeUserById = async (userId) => {
    try {
        return await userModel.removeById(userId)
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}