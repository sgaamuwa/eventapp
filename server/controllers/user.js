const User = require('../models').User;

createUser = function(req, res){
    // check that no other user with that username exists and then set up that user
    User.findAll({
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
                password: req.body.password
            }).then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
        }
    }) 
};

getUser = function(req, res){
    res.status(200).send('This was a success');
};

module.exports = {
    createUser,
    getUser
}