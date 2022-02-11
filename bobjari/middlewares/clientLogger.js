const logger = require('../config/winston');
const config = require('../config/index')
const axios = require('axios');

exports.getHostname = (req, res, next) => {
    const forwardedIpStr = 
        req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let ipAddress = null;
    const userAgent = req.headers['user-agent']
    if (forwardedIpStr) {
        ipAddress = forwardedIpStr.split(',')[0];
    }
    const headers = req.rawHeaders;
    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            try{  
                const parse = headers.filter(el => 
                    el === config.client_server.dev ||
                    el === config.client_server.real 
                )
                if (parse.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch(err) {
                logger.error(err)
                reject(err)
            }   
        }
    );

    const onError = (err) => {
        
    }

    // process the promise
    p.then(async (isMine) => {
        if (!isMine) {
            const ip = ipAddress.slice(7)
            logger.warn('not my front-end client server');
            logger.warn('IP address: ' + ip);
            logger.warn('User agent: ' + userAgent);
            /*
            await axios.get('http://ip-api.com/json/'+ip)
                .then(res => {
                    const r = res.data
                    logger.warn(r.country+' '+r.regionName+' '+r.city+' '+r.isp)
                    axios({
                        method: 'GET',
                        url: config.telegram.uri,
                        params: {
                            chat_id: config.telegram.chatId,
                            text: 'Unknown host connection detected!\n'
                                + 'IP Adress  : ' + ip + '\n'
                                + 'User Agent : ' + userAgent + '\n'
                                + r.country+' '+r.regionName+' '+r.city+' '+r.isp,
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            */
        } else {
            logger.info('received from my front-end client server')
        }
        next();
    }).catch(onError);
}
