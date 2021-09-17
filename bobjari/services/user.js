const { data } = require('../config/winston');
const logger = require('../config/winston');
const userModel = require('../models/user/handler');

exports.postUser = async (user) => {
    try {
        let data = await userModel.create(user);
        return data;
    } catch(err) { 
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUsers = async () => {
    try {
        let data = await userModel.findAll();
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUserByUserid = async(userId) => { 
    try {
        let data = await userModel.findOneByUserid(userId);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.putUserByUserid = async(userId, user) => {
    try {
        let data = await userModel.updateByUserid(userId, user);
        return data;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.deleteUserByUserid = async(userId) => {
    try {
        await userModel.deleteByUserid(userId);
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}