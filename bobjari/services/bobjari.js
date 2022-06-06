const logger = require('../config/winston');
const bobjariModel = require('../models/bobjari/handler');
const menteeService = require('../services/mentee');
const mentorService = require('../services/mentor');
const async = require('async')
const admin = require('firebase-admin')

exports.createBobjari = async (menteeId, mentorId, proposal) => {
    try {
        const bobjari = await bobjariModel.create({
            mentee: menteeId,
            mentor: mentorId,
            proposal: proposal,
        })

        let menteeNickname
        let deviceToken
        await menteeService.getMenteeByIdWithMeta(menteeId)
            .then(mentee => {
                if (mentee) {
                    menteeNickname = mentee.userDetail.profile.nickname
                } else {
                    menteeNickname = '(알 수 없음)'
                }
            })
            .catch(err => {
                logger.error('POST /bobjari')
                logger.error(err.stack)
                res.status(400).end('Failed getting mentee nickname')
            })
        await mentorService.getMentorByIdWithDetails(mentorId)
            .then(mentor => {
                if (mentor) {
                    deviceToken = mentor.userDetail.deviceToken
                } else {
                    deviceToken = ''
                }
            })
            .catch(err => {
                logger.error('POST /bobjari')
                logger.error(err.stack)
                res.status(400).end('Failed getting mentor deviceToken')
            })

        // FCM Notification
        // required data : sender nickname, receiver deviceToken
        let noti_message = {
            notification: {
                title: menteeNickname,
                body: '밥자리 신청이 도착했습니다.'
            }
        }
        let options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        }
        if (deviceToken !== '' && deviceToken !== null) {
            logger.info(`${menteeNickname} device token : ${deviceToken}`)
            admin
            .messaging()
            .sendToDevice(deviceToken, noti_message, options)
            .then(res => {
                logger.info('Successfully sent message: ', res)
            })
            .catch(err => logger.error('Error Sending message: ', err))
        } else {}

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