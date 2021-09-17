const { data } = require('../config/winston');
const logger = require('../config/winston');
const userSchema = require('../models/user');

exports.postUser = async (user) => {
    try {
        let data = await userSchema.create(user);
        return data;
    } catch(err) { 
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUsers = async () => {
    try {
        let data = await userSchema.findAll();
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUserByUserid = async(userId) => { 
    try {
        let data = await userSchema.findOneByUserid(userId);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.putUserByUserid = async(userId, user) => {
    try {
        let data = await userSchema.updateByUserid(userId, user);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.deleteUserByUserid = async(userId) => {
    try {
        await userSchema.deleteByUserid(userId);
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}