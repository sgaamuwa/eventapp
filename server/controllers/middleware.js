const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models').User
const _ = require('lodash');

let apiRoutes = express.Router();

apiRoutes.use(function (req, res, next) {

	let token = req.headers['jwt-token'];

	if (token) {
		// verify the token using the secretkey
		jwt.verify(token, 'kinggaamuwasamuel', function (err, decoded) {
			if (err) {
				return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
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

sessionUserCheck = function(req, res, next){
	if(req.session && req.session.user){
		User.findAll({
			where: {
				id: req.session.user.id
			}
		}).then(function(user){
			if(_.isEmpty(user)){
				req.session.reset();
				res.status(401).send('Please login');
			}else{
				next();
			}
		}).catch(function(error){
			res.status(500).send('error error');
		});
	}else{
		return res.status(401).send('Please login');
	}
}

module.exports = {
	apiRoutes,
	sessionUserCheck
}