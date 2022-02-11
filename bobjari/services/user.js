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
    console.log(data)
    try {
        let mentee, mentor, mentorDetails, menteeMeta, mentorMeta
        const userData = { 
            profile: {
                email: data.email,
                age: data.age,
                gender: data.gender,
                nickname: data.nickname,
                image: {
                    data: (files.img !== null ?
                        files.img.buffer : data.img),
                    contentType: (files.img !== null ?
                        files.img.mimetype : 'url'),
                },
            },
            role: data.role,
        };
        
        const user = await userModel.create(userData);

        console.log(data.job)

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

exports.changeUserRoleByEmail = async (curRole, email) => {
    let role
    if (curRole === 'mentee') role = 'mentor'
    else role = 'mentee'
    try {
        return await userModel.changeRoleByEmail(email, role)
    } catch (err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.toggleUserSearchAllowByEmail = async (email, curState) => {
    try {
        return await userModel.toggleSearchAllowByEmail(email, curState)  
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
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