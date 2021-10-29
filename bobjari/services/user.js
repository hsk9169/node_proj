const { data } = require('../config/winston');
const logger = require('../config/winston');
const userModel = require('../models/user/handler');
const config = require('../config/index');
const crypto = require('crypto');

exports.postUser = async (data) => {
    try {
        try {
            let pwd = data.password;
            pwd = crypto.createHmac('sha1', config.secret)
                        .update(pwd)
                        .digest('base64')
            data.password = pwd;
        } catch {};
        const profile = await userModel.create(data);
        return profile;
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
/*
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
*/
exports.getUserByEmail = async(email) => {
    try {
        let ret = await userModel.findOneByEmail(email);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUserByPhone = async(phone) => {
    try {
        let ret = await userModel.findOneByPhone(phone);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}

exports.getUserByNickname = async(nickname) => {
    try {
        let ret = await userModel.findOneByNickname(nickname);
        console.log(ret);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}