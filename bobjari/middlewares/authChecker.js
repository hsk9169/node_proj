const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.check = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'];

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'no token embedded'
        });
    };

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            //const cert = fs.readFileSync('private_key.pem');
            jwt.verify(token, 'shhhhh', (err, decoded) => {
                if(err) reject(err);
                resolve(decoded);
            });
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (err) => {
        res.status(403).json({
            success: false,
            message: err.message
        });
    };

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded;
        next();
    }).catch(onError);
}
