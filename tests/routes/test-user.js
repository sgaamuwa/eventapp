const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const User = require('../../server/models').User;
const userController = require('../../server/controllers').user;

let userInput;
let request = {};

chai.use(chaiHttp);

describe('User Controller Tests', function(){
    before(function(done){
        userInput = [
            // full names
            {
                firstName: "Samuel",
                lastName: "Gaamuwa",
                userName: "sgaamuwa",
                password: "pass123"
            },
            {
                userName: "aokoth",
                firstName: "Arnold",
                lastName: "Okoth",
                password: "pass123"
            },
            {
                userName: "rwachira",
                firstName: "Rehema",
                lastName: "Wachira",
                password: "pass123"
            },
            {
                userName: "kndegwa",
                firstName: "Kimani",
                lastName: "Ndegwa",
                password: "pass123"
            },
            // lacking certain credentials
            {
                userName: "",
                firstName: "Arnold",
                lastName: "Okoth",
                password: "pass123"
            },
            {
                userName: "aokoth",
                firstName: "Arnold",
                lastName: "Okoth",
                password: ""
            },
            {
                userName: "aokoth",
                firstName: "",
                lastName: "Okoth",
                password: "pass123"
            },
            {
                userName: "aokoth",
                firstName: "Arnold",
                lastName: "",
                password: "pass123"
            }
        ]
        User.destroy({ where: {} }).then(function(){
            done();
        });
    });
    afterEach(function(done){
        User.destroy({ where: {} }).then(function(){
            done();
        });
    });

    it('should create a user if all parameters are valid', function(done){
        chai.request(server)
            .post('/api/users')
            .send(userInput[0])
            .end(function(err, res){
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should not create a user if the userName already exists', function(done){
        chai.request(server)
            .post('/api/users')
            .send(userInput[0])
            .end(function(err, res){
                // ensure that the user has been created
                expect(res).to.have.status(201);
                chai.request(server)
                    .post('/api/users')
                    .send(userInput[0])
                    .end(function(error, response){
                        // ensure that the same user can't be created twice
                        expect(response).to.have.status(400);
                        done();
                    });
            });
    });

    it('should return an error if user information for creation is incomplete', function(done){
        for(counter = 4; counter < 8; counter++){
            chai.request(server)
                .post('/api/users')
                .send(userInput[counter])
                .end(function(err, res){
                    expect(res).to.have.status(400);
                });
        }
        done();
    });

    it('should get a user if the right id is provided', function(done){
        chai.request(server)
        .post('/api/users')
        .send(userInput[0])
        .end(function(err, res){
            // ensure that the user has been created
            expect(res).to.have.status(201);
            chai.request(server)
                .get('/api/user/1')
                .end(function(error, response){
                    // ensure that the same user can't be created twice
                    expect(response).to.have.status(400);
                    done();
                });
        });
    });

    it('should raise an error if the user is not available', function(done){
        chai.request(server)
            .get('/api/user/1')
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response).to.have.status(401);
                done();
            });
    });

    it('should update a user if they exist', function(done){
        chai.request(server)
            .post('/api/users')
            .send(userInput[0])
            .end(function(err, res){
                // ensure that the user has been created
                expect(res).to.have.status(201);
                chai.request(server)
                    .patch('/api/user/1')
                    .send({username : "gsamuel"})
                    .end(function(error, response){
                        // ensure that the same user can't be created twice
                        expect(response).to.have.status(200);
                        done();
                    });
            });
    });

    it('should not update if there is no information passed', function(done){
        chai.request(server)
            .post('/api/users')
            .send(userInput[0])
            .end(function(err, res){
                // ensure that the user has been created
                expect(res).to.have.status(201);
                chai.request(server)
                    .patch('/api/user/1')
                    .send({})
                    .end(function(error, response){
                        // ensure that the same user can't be created twice
                        expect(response).to.have.status(400);
                        done();
                    });
            });
    });

    it('should delete a user if they exist', function(done){
        chai.request(server)
        .post('/api/users')
        .send(userInput[0])
        .end(function(err, res){
            // ensure that the user has been created
            expect(res).to.have.status(201);
            chai.request(server)
                .del('/api/user/1')
                .send({username : "gsamuel"})
                .end(function(error, response){
                    // ensure that the same user can't be created twice
                    expect(response).to.have.status(200);
                    done();
                });
        });
    });

    it('should return if deleted user does not exist', function(done){
        chai.request(server)
            .del('/api/user/1')
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response).to.have.status(200);
                done();
            });
    });

});