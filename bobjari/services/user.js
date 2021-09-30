const { data } = require('../config/winston');
const logger = require('../config/winston');
const userModel = require('../models/user/handler');
const config = require('../config/index');
const crypto = require('crypto');

exports.postUser = async (user) => {
    try {
        let pwd = user.userPwd;
        pwd = crypto.createHmac('sha1', config.secret)
                      .update(pwd)
                      .digest('base64')
        user.userPwd = pwd;
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

exports.getUserByUseremail = async(email) => {
    try {
        let ret = await userModel.findOneByUseremail(email);
        return ret;
    } catch(err) {
        logger.error(err.stack);
        throw Error(err);
    }
}