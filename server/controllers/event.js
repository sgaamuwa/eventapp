const Event = require('../models').event;
const User = require('../models').User;

createEvent = function(req, res){
    // check if there is a user
    if(res.session.user){
        let event = req.body;
        // check that the user exists
        return User.findOne({
            where:{
                id: res.session.user.id,
                userName: res.session.user.userName
            }
        }).then(function(user){
            if(user){
                event.userId = user.id;
                Event.create(event).then(function(createdEvent){
                    res.status(201).send(createdEvent);
                }).catch(function(error){
                    res.status(400).send('Send more data');
                });
            }else{
                res.status(400).send('User does not exist');
            }
        }).catch
    }else{
        res.status(401).send('Please login');
    }  
}

getAllEvents = function(req, res){
    if(res.session.user){
        return Event.findAll({
            where:{
                userId: res.session.user.id
            }
        }).then(function(events){
            events.length == 0 ? res.status(200).send('No Events, Please add an event') :
            res.status(200).send(events);
        }).catch(function(error){
            res.status(400).send('Error error');
        });
    }else{
        return res.status(401).send('Please login');
    }
}

getOneEvent = function(req, res){
    if(res.session.user){
        return Event.findOne({
            where: {
                id: res.params.id
            }
        }).then(function(event){
            if(!event){
                res.status(404).send('No such event');
            }
            if(event.userId == req.session.user.id){
                res.status(200).send(event);
            }else{
                res.status(403).send('You are not authorized to view this resource');
            }
        })
    }else{
        return res.status(401).send('Please login');
    }
}

updateEvent = function(req, res){
    // check that the body is not empty and that it does not include a user id
    if(!req.body || req.body.userId){
        return res.status(400).send('Do better');
    }
    if(res.session.user){
        return Event.findOne({
            where: {
                id: res.params.id
            }
        }).then(function(event){
            // return a 404 if it doesn't exist
            if(!event){
                res.status(404).send('No such event');
            }
            // ensure that it was created by the same user;
            if(event.userId == req.session.user.id){
                event.update(req.body).then(function(event){
                    res.status(200).send(event);
                })
            }else{
                res.status(403).send('You are not authorized to view this resource');
            }
        })
    }else{
        return res.status(401).send('Please login');
    }
}

deleteEvent = function(req, res){
    if(res.session.user){
        return Event.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(event){
            if(!event){
                res.status(404).send('No such event');
            }
            if(event.userId == req.session.user.id){
                Event.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(function(){
                    res.status(204).send('Event deleted');
                })
            }else{
                res.status(403).send('You are not authorized to view this resource');
            }
        })
    }else{
        return res.status(401).send('Please login');
    }
}

module.exports = {
    createEvent
}