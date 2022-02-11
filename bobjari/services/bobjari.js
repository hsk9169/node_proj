const logger = require('../config/winston');
const bobjariModel = require('../models/bobjari/handler');

exports.createBobjari = async (menteeId, mentorId, appointment) => {
    try {
        const bobjari = await bobjariModel.create({
            mentee: menteeId,
            mentor: mentorId,
            appointment: appointment,
        })
        return bobjari
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getBobjariListByMenteeId = async (menteeId) => {
    try {
        const bobjariList = await bobjariModel.getListByMenteeId(menteeId)
        return bobjariList
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getBobjariListByMentorId = async (mentorId) => {
    try {
        const bobjariList = await bobjariModel.getListByMentorId(mentorId)
        return bobjariList
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.updateBobjariLevel = async (bobjariId, level) => {
    try {
        const bobjari = await bobjariModel.updateLevel(bobjariId, level)
        return bobjari
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.removeBobjariById = async (bobjariId) => {
    try {
        const ret = await bobjariModel.removeById(bobjariId)
        return ret
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}