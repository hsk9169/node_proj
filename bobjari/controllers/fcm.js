const admin = require('firebase-admin')

exports.sendMessage = async (req, res) => {
    
        console.log(req.body.topic)
        console.log(req.body.token)
        let message = {
            notification: {
              title: req.body.title,
              body: req.body.body,
            },
            topic: req.body.topic,
            data: req.body.data,
            android: {
              priority: "high",
              ttl: 60 * 60 * 1,
              notification: {
                channel_id: 'main_channel',
              },
            },
            apns: {
              payload: {
                aps: {
                  sound: "default",
                  contentAvailable : true
                }
              },
              headers: {
                "apns-push-type": "alert",
                "apns-priority": "5"
              }
            },
          }
        
          admin
            .messaging()
            .send(message)
            .then(function (response) {
              console.log('Successfully sent message: : ', response)
              res.status(200).send(response)
            })
            .catch(function (err) {
              console.log('Error Sending message!!! : ', err)
              res.status(400).end(err)
            })

}