const express = require('express');
const jwt = require('jsonwebtoken');

let apiRoutes = express.Router();

apiRoutes.use(function(req, res, next){
    let token = req.headers['jwt-token'];

    if(token){
        jwt.verify(token, 'kinggaamuwasamuel', function(err, decoded){
            if(err){
                return res.json({ success: false, message: 'Failed to authenticate token'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

module.exports = {
    apiRoutes
}