const User = require('../models').User;
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const _ = require('lodash');

authenticate = function(req, res){
    // look for the user in the database
    return User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(function(user){
        if(user){
            // verify that the password matches the hashed password in the database
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
                // send a 400 if the password does not match
                res.status(400).send('Invalid password, authentication failed');
            }
        }else{
            // send a 400 if the user is not in the database
            res.status(400).send('User not found, authentication failed');
        }
    }).catch(function(err){
        // send a 500 if there is a system error
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
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                //hash the password
                password: passwordHash.generate(req.body.password)
            }).then(user => res.status(201).send(user))
            .catch(error => res.status(400).send({error}));
        }
    }) 
};

getUser = function(req, res){
    return User.findOne({
        where: {
            id: req.params.id
        }
    }).then((user) => {
        res.status(200).send(user);
    }).catch(error => res.status(404).send(error));
};

getUsers = function(req, res){
    return User.findAll().then(function(users){
        res.status(200).send(users);
    });
}

updateUser = function(req, res){
    return User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(user){
        user.update(req.body).then(function(updatedUser){
            res.status(200).send(updatedUser);
        }).catch(function(err){
            res.status(400).send('Bad request');
        });
    }).catch(function(err){
        res.status(404).send('Do better');
    });
};

module.exports = {
    authenticate,
    updateUser,
    createUser,
    getUsers,
    getUser,
}