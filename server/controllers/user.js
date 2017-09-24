const User = require('../models').User;
const passwordHash = require('password-hash');

createUser = function(req, res){
    // check that no other user with that username exists and then set up that user
    console.log(res);
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
    createUser,
    getUser
}