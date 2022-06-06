const logger = require('../config/winston');
const jobModel = require('../models/autocomplete/job/handler');
const corpModel = require('../models/autocomplete/corp/handler');

exports.addJobToList = async (job) => {
    try {
        const jobList = await jobModel.create({
            job: job,
        })
        return jobList
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.addCorpToList = async (corp) => {
    try {
        const corpList = await corpModel.create({
            corp: corp,
        })
        return corpList
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getJobList = async (keyword, num) => {
    try {
        const res = await jobModel.findByKeyword(keyword, num)
        let ret = []
        let data = []
        res.map(el => {
            ret.push({element: el, priority: el.job.indexOf(keyword, 0)})
        })
        ret.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority))
        ret.map(el => {data.push(el.element)})
        return data
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

exports.getCorpList = async (keyword, num) => {
    try {
        const res = await corpModel.findByKeyword(keyword, num)
        let ret = []
        let data = []
        res.map(el => {
            ret.push({element: el, priority: el.corp.indexOf(keyword, 0)})
        })
        ret.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority))
        ret.map(el => {data.push(el.element)})
        return data
    } catch(err) {
        logger.error(err.stack)
        throw Error(err)
    }
}

