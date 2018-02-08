const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const User = require('../../server/models').User;
const userController = require('../../server/controllers').user;
const userPayloads = require('../test_helpers/user-payloads');

let userInput;
let token;
let request = {};

chai.use(chaiHttp);

describe('User Controller Tests', function () {
	before(function (done) {
		// add users to the database
		User.destroy({ where: {} }).then(function () {
			User.bulkCreate(userPayloads.getBulkCreate())
				.then(function () {
					// get a session for a user
					chai.request(server)
						.post('/login')
						.send({
							userName: "test",
							password: "pass123"
						})
						.end(function (err, res) {
							token = res.body.token;
							done();
						});
				});
		});
	});
	after(function (done) {
		User.destroy({ where: {} }).then(function () {
			done();
		}).catch(function (err) {
			console.log(err);
			done();
		});
	});

	// POST tests
	it('should create a user if all parameters are valid', function (done) {
		chai.request(server)
			.post('/register')
			.send(userPayloads.getValidPostUser())
			.end(function (err, res) {
				expect(res).to.have.status(201);
				done();
			});
	});

	it('should not create a user if the userName already exists', function (done) {
		chai.request(server)
			.post('/register')
			.send(userPayloads.getBulkCreate()[0])
			.end(function (err, res) {
				// ensure that the user has been created
				expect(res).to.have.status(400);
				done();
			});
	});

	// it('should return an error if user information for creation is incomplete', function(done){
	//     for(counter = 4; counter < 8; counter++){
	//         chai.request(server)
	//             .post('/register')
	//             .send(userInput[counter])
	//             .end(function(err, res){
	//                 expect(res).to.have.status(400);
	//             });
	//     }
	//     done();
	// });

	// GET tests
	it('should get all users', function (done) {
		chai.request(server)
			.get('/api/users')
			.set({ 'JWT-Token': token })
			.end(function (err, res) {
				expect(res.body).to.be.length(5);
				expect(res).to.have.status(200);
				done();
			});
	})

	it('should get a user if the right id is provided', function (done) {
		chai.request(server)
			.get('/api/user/3')
			.set({ 'JWT-Token': token })
			.end(function (error, response) {
				// ensure that you can get the user
				expect(response).to.have.status(200);
				done();
			});
	});

	it('should raise an error if the user is not available', function (done) {
		chai.request(server)
			.get('/api/user/20002')
			.set({ 'JWT-Token': token })
			.end(function (error, response) {
				expect(response).to.have.status(404);
				done();
			});
	});

	// PATCH tests
	it('should update a user if they exist', function (done) {
		chai.request(server)
			.patch('/api/user/1')
			.set({ 'JWT-Token': token })
			.send({ userName: "sgaamuwa" })
			.end(function (error, response) {
				// ensure that the same user can't be created twice
				expect(response.body.userName).to.equal('sgaamuwa');
				expect(response).to.have.status(200);
				done();
			});
	});

	it('should not update if there is no information passed', function (done) {
		chai.request(server)
			.patch('/api/user/5')
			.set({ 'JWT-Token': token })
			.send({})
			.end(function (error, response) {
				// ensure that the same user can't be created twice
				expect(response).to.have.status(400);
				done();
			});
	});

	it('should not update if the user does not exist', function (done) {
		chai.request(server)
			.patch('/api/user/2345323')
			.set({ 'JWT-Token': token })
			.send({ userName: "gsamuel" })
			.end(function (error, response) {
				expect(response).to.have.status(404);
				done();
			});
	});

	it('should raise an error if the update information is wrong', function (done) {
		chai.request(server)
			.patch('/api/user/5')
			.set({ 'JWT-Token': token })
			.send({ news: "test" })
			.end(function (error, response) {
				expect(response).to.have.status(400);
				done();
			});
	});

	// DELETE tests
	it('should delete a user if they exist', function (done) {
		chai.request(server)
			.del('/api/user/2')
			.set({ 'JWT-Token': token })
			.end(function (error, response) {
				// ensure that the same user can't be created twice
				expect(response).to.have.status(204);
				done();
			});
	});

	it('should return error if the user was deleted', function (done) {
		chai.request(server)
			.del('/api/user/3')
			.set({ 'JWT-Token': token })
			.end(function (error, response) {
				// ensure that the same user can't be created twice
				expect(response).to.have.status(204);
				chai.request(server)
					.del('/api/user/3')
					.set({ 'JWT-Token': token })
					.end(function (error, response) {
						// ensure that the same user can't be created twice
						expect(response).to.have.status(404);
						done();
					});
			});
	});

	it('should return error if deleted user does not exist', function (done) {
		chai.request(server)
			.del('/api/user/2345323')
			.set({ 'JWT-Token': token })
			.end(function (error, response) {
				// ensure that the same user can't be created twice
				expect(response).to.have.status(404);
				done();
			});
	});
});