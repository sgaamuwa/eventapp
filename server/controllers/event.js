const Event = require('../models').event;
const User = require('../models').User;
const _ = require('lodash');
const uniqid = require('uniqid');

let eventData = ['eventTitle', 'location', 'availableSlots', 'eventDate', 'eventLink'];
createEvent = function (req, res) {
	let event = req.body;
	// ensure that it is not empty
	if (_.isEmpty(req.body)) {
		return res.status(400).send('The body is empty');
	}
	// check that the user exists
	return User.findOne({
		where: {
			id: req.session.user.id,
			userName: req.session.user.userName
		}
	}).then(function (user) {
		if (user) {
			event.id = uniqid();
			event.userId = user.id;
			Event.create(event).then(function (createdEvent) {
				res.status(201).send(createdEvent);
			}).catch(function (error) {
				res.status(400).send('Wrong data was sent');
			});
		} else {
			res.status(400).send('User does not exist');
		}
	}).catch(function(error){
		res.status(500).send('error error');
	});
}

getAllEvents = function (req, res) {
	return Event.findAll({
		where: {
			userId: req.session.user.id
		}
	}).then(function (events) {
		events.length == 0 ? res.status(200).send('No Events, Please add an event') :
			res.status(200).send(events);
	}).catch(function (error) {
		res.status(400).send('Error error');
	});
}

getOneEvent = function (req, res) {
	return Event.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (event) {
		if (!event) {
			res.status(404).send('No such event');
		}
		if (event.userId == req.session.user.id) {
			res.status(200).send(event);
		} else {
			res.status(403).send('You are not authorized to view this resource');
		}
	});
}

updateEvent = function (req, res) {
	// check that the body is not empty and that it does not include a user id
	if (_.isEmpty(req.body)) {
		return res.status(400).send('The body is empty');
	} else {
		_.forEach(Object.keys(req.body), function (key) {
			if (!(eventData.includes(key))) {
				return res.status(400).send('Wrong data');
			}
		});
	}
	return Event.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (event) {
		// return a 404 if it doesn't exist
		if (!event) {
			res.status(404).send('No such event');
		}
		// ensure that it was created by the same user;
		if (event.userId == req.session.user.id) {
			event.update(req.body).then(function (event) {
				res.status(200).send(event);
			})
		} else {
			res.status(403).send('You are not authorized to view this resource');
		}
	});
}

deleteEvent = function (req, res) {
	return Event.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (event) {
		if (!event) {
			res.status(404).send('No such event');
		}
		if (event.userId == req.session.user.id) {
			Event.destroy({
				where: {
					id: req.params.id
				}
			}).then(function () {
				res.status(204).send('Event deleted');
			})
		} else {
			res.status(403).send('You are not authorized to view this resource');
		}
	});
}

module.exports = {
	createEvent,
	getAllEvents,
	getOneEvent,
	updateEvent,
	deleteEvent
}