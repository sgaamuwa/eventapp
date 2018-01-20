const Event = require('../models').Event;

createEvent = function(req, res){
    return Event.create(req.body).then(function(event){
        res.status(201).send(event);
    })
}

module.exports = {
    createEvent
}