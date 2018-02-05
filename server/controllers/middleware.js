const express = require('express');
const jwt = require('jsonwebtoken');

let apiRoutes = express.Router();

apiRoutes.use(function(req, res, next){

    let token = req.headers['jwt-token'];

    if(token){
        // verify the token using the secretkey
        jwt.verify(token, 'kinggaamuwasamuel', function(err, decoded){
            if(err){
                return res.status(401).json({ success: false, message: 'Failed to authenticate token'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token return a 403 
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

module.exports = {
    apiRoutes
}