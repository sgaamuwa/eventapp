const Event = require('../models').event;
const User = require('../models').User;
const EventUser = require('../models').EventUser;
const _ = require('lodash');

addParticipant = function (req, res) {
	if (req.session.user) {
		// check that the event and user exist
		return Event.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (event) {
			if (_.isEmpty(event)) {
				res.status(404).send('Event does not exist');
			} else {
				User.findAll({
					where: {
						id: req.params.userId
					}
				}).then(function (user) {
					if (_.isEmpty(user)) {
						res.status(404).send('UserId is not valid');
						// check that the user is either the creator or the actual user
					} else if ((user.id != req.session.user.id) || (event.userId != req.session.user.id)) {
						res.status(403).send('You do not have the permission to do this');
					} else {
						EventUser.findAll({
							where: {
								userId: req.params.userId,
								eventId: req.params.id
							}
						}).then(function (eventParticipant) {
							if (_.isEmpty(eventParticipant)) {
								EventUser.create({
									userId: req.params.userId,
									eventId: req.params.id
								}).then(function () {
									res.status(200).send('User added to event');
								}).catch(function (error) {
									res.status(500).send('Attaching failed do better');
								})
							} else {
								res.status(400).send('User already add, what you doing');
							}
						})
					}
				}).catch(function (error) {
					res.status(500).send('error error');
				})
			}
		}).catch(function (error) {
			res.status(500).send('error error');
		});
	} else {
		return res.status(401).send('Please login');
	}
}

getParticipants = function (req, res) {
	return Event.findAll({
		where: {
			id: req.params.id
		}
	}).then(function (event) {
		if (_.isEmpty(event)) {
			res.status(404).send('Event does not exist');
		} else {
			EventUser.findAll({
				where: {
					eventId: req.params.id
				}
			}).then(function (eventParticipants) {
				mapIdToUser(eventParticipants).then(function (participants) {
					res.status(200).send(participants);
				})
			}).catch(function (error) {
				res.status(500).send('error error');
			})
		}
	}).catch(function (error) {
		res.status(500).send('error error');
	})
}

getUserEvents = function (req, res) {
	if (req.session.user) {
		return User.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (user) {
			if (_.isEmpty(user)) {
				res.status(404).send('User does not exist');
				// ensure that the owner of the event is he who is requesting them
			} else if (req.params.id != req.session.user.id) {
				res.status(403).send('You do not have permission for this');
			} else {
				Event.findAll({
					where: {
						userId: req.params.id
					}
				}).then(function (events) {
					if (_.isEmpty(events)) {
						res.status(200).send('You do not have any events');
					} else {
						res.status(200).send(events);
					}
				})
			}
		})
	} else {
		return res.status(401).send('Please login');
	}
}

mapIdToUser = function (eventParticipants) {
	let mappedParticipants = [];
	return new Promise(function (resolve, reject) {
		_.map(eventParticipants, function (eventParticipant) {
			User.findOne({
				where: {
					id: eventParticipant.userId
				}
			}).then(function (user) {
				mappedParticipants.push(user);
				if (mappedParticipants.length == eventParticipants.length) {
					resolve(mappedParticipants);
				}
			}).catch(function (error) {
				reject(error);
			})
		});
	})

}

module.exports = {
	getParticipants,
	getUserEvents
}