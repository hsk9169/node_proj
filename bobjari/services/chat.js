const logger = require('../config/winston')
const chatModel = require('../models/chat/handler')
const bobjariModel = require('../models/bobjari/handler')
const async = require('async')
const admin = require('firebase-admin')

exports.createChat = async (bobjariId, message, userId, nickname, deviceToken) => {
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
                const date = 
                    await bobjariModel.updateDate(chat.bobjari.toString(),
                                                  chat.createdAt)
                return(chat, date)
            },
        ], function(err, result) {
            if (err) throw err
            return(result.chat)
        })
        // FCM Test
        //let target_token = 'ft4MTAlzhUuujLwCGA3lpX:APA91bFz7FdaeLH0Ac-5zkscjjbKYufKSvKdoNiOJm0lwCpGOH30t68z3mUM2CvAwXMYxmI2pVOgH8Qc0efYJuJPAraDTs2pkRvyLZQbltHSay8K1W_1HUXH-jNi_oNElcRb8vhfAAPj'
        let noti_message = {
            notification: {
                title: nickname,
                body: message
            }
        }
        let options = {
            prioritiy: 'high',
            timeToLive: 60 * 60 * 24
        }
        if (deviceToken !== null) {
            admin
            .messaging()
            .sendToDevice(deviceToken, noti_message, options)
            .then(res => {
                console.log('Successfully sent message: ', res)
            })
            .catch(err => console.log('Error Sending message: ', err))
        }else {}
        
        
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