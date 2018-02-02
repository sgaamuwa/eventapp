const Event = require('../models').event;
const User = require('../models').User;

createEvent = function(req, res){
    // check if there is a user
    let event = req.body;
    event.id = Math.floor(Math.random() * 50000);
    event.userId = 1;
    return Event.create(event).then(function(event1){
        res.status(201).send(event1);
    }).catch(function(error){
        console.log('This is the error>>', error);
    });
}

module.exports = {
    createEvent
}