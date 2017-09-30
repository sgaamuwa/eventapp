const User = require('../models').User;
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

authenticate = function(req, res){
    return User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(function(user){
        if(user){
            if(passwordHash.verify(req.body.password, user.password)){
                let token = jwt.sign({data: user}, 'kinggaamuwasamuel', {
                    expiresIn: 1440
                });
                res.status(200).json({
                    success: true,
                    message: 'JWT Token',
                    token: token
                });
            }
            else{
                res.status(400).send('Invalid password, authentication failed');
            }
        }else{
            res.status(400).send('User not found, authentication failed');
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
};

createUser = function(req, res){
    // check that no other user with that username exists and then set up that user
    return User.findAll({
        where: {
            userName: req.body.userName
        }
    }).then((users) => {
        if(users.length > 0){
            res.status(400).send('A user with that username already exists')
        }else{
            User.create({
                id: 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                //hash the password
                password: passwordHash.generate(req.body.password)
            }).then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
        }
    }) 
};

getUser = function(req, res){
    return User.findOne({
        where: {
            id: 1
        }
    }).then((user) => {
        res.status(200).send(user);
    }).catch(error => res.status(400).send(error));
};

module.exports = {
    authenticate,
    createUser,
    getUser
}