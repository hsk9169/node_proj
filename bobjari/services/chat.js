const logger = require('../config/winston')
const chatModel = require('../models/bobjari/chat/handler')

exports.createChat = async (bobjariId, message, userId) => {
    try {
        const chat = await chatModel.create({
            bobjari: bobjariId,
            message: message,
            user: userId,
        })
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getChatByDateWithStep = function (bobjariId, startIdx, num) {
    try {
        const chatArray = await chatModel.getByDateWithStep(bobjariId, startIdx, num)
        return chatArray
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}