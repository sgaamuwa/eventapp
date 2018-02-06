const userController = require('../controllers').user
const eventController = require('../controllers').event

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Approach and behold greatness'
    }));
    // user routes
    app.post('/login', userController.authenticate);
    app.post('/register', userController.createUser);
    app.get('/api/users', userController.getUsers);
    app.get('/api/user/:id', userController.getUser);
    app.patch('/api/user/:id', userController.updateUser);
    app.delete('/api/user/:id', userController.deleteUser);

    // event routes
    app.post('/api/events', eventController.createEvent);
    app.get('/api/events/', eventController.getAllEvents);
    app.get('/api/event/:id', eventController.getOneEvent);
    app.patch('/api/event/:id', eventController.updateEvent);
    app.delete('/api/event/:id', eventController.deleteEvent);
}