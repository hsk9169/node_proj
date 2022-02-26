const logger = require('../config/winston')
const chatModel = require('../models/chat/handler')
const bobjariModel = require('../models/bobjari/handler')
const async = require('async')

exports.createChat = async (bobjariId, message, userId) => {
    try {
        async.waterfall([
            async () => {
                const chat = await chatModel.create({
                    bobjari: bobjariId,
                    message: message,
                    author: userId,
                })
                return(chat)
            },
            async (chat) => {
                console.log(chat.bobjari.toString())
                console.log(chat.createdAt)                
                const date = 
                    await bobjariModel.updateDate(chat.bobjari.toString(),
                                                  chat.createdAt)
                return(chat, date)
            },
        ], function(err, result) {
            if (err) throw err
            console.log(result)
            return(result.chat)
        })
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getMessagesByDateWithStep = async (bobjariId, startIdx, num) => {
    try {
        const chatArray = await chatModel.getByDateWithStep(bobjariId, startIdx, num)
        return chatArray
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}