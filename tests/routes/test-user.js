const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const User = require('../../server/models').User;
const userController = require('../../server/controllers').user;

let userInput;
let token;
let request = {};

chai.use(chaiHttp);

describe('User Controller Tests', function(){
    before(function(done){
        userInput = [
            // full names
            {
                id: "1",
                firstName: "Samuel",
                lastName: "Gaamuwa",
                userName: "sgaamuwa",
                password: "pass123"
            },
            {
                id: "2",
                userName: "aokoth",
                firstName: "Arnold",
                lastName: "Okoth",
                password: "pass123"
            },
            {
                id: "3",
                userName: "rwachira",
                firstName: "Rehema",
                lastName: "Wachira",
                password: "pass123"
            },
            {
                id: "4",
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
            },
        ]
        User.destroy({ where: {} }).then(function(){
            User.bulkCreate([userInput[0], userInput[1], userInput[2]])
                .then(function(){
                    done();
                });
        });
    });
    before(function(done){
        chai.request(server)
            .post('/register')
            .send({
                id: "5",
                userName: "test",
                firstName: "Test FirstName",
                lastName: "Test LastName",
                password: "pass123"
            })
            .end(function(err, res){
                chai.request(server)
                    .post('/login')
                    .send({
                        userName: "test",
                        password: "pass123"
                    })
                    .end(function(err, res){
                        token = res.body.token;
                        done();
                    });
            });
    });
    after(function(done){
        User.destroy({ where: {} }).then(function(){
            done();
        }).catch(function(err){
            console.log(err);
            done();
        });
    });

    it('should create a user if all parameters are valid', function(done){
        chai.request(server)
            .post('/register')
            .send(userInput[3])
            .end(function(err, res){
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should not create a user if the userName already exists', function(done){
        chai.request(server)
            .post('/register')
            .send(userInput[0])
            .end(function(err, res){
                // ensure that the user has been created
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should return an error if user information for creation is incomplete', function(done){
        for(counter = 4; counter < 8; counter++){
            chai.request(server)
                .post('/register')
                .send(userInput[counter])
                .end(function(err, res){
                    expect(res).to.have.status(400);
                });
        }
        done();
    });

    it('should get all users', function(done){
        chai.request(server)
            .get('/api/users')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res.body).to.be.length(5);
                expect(res).to.have.status(200);
                done();
            });
    })

    it('should get a user if the right id is provided', function(done){
        chai.request(server)
            .get('/api/user/3')
            .set({'JWT-Token': token})
            .end(function(error, response){
                // ensure that you can get the user
                expect(response).to.have.status(200);
                done();
            });
    });

    it('should raise an error if the user is not available', function(done){
        chai.request(server)
            .get('/api/user/20002')
            .set({'JWT-Token': token})
            .end(function(error, response){
                expect(response).to.have.status(404);
                done();
            });
    });

    it('should update a user if they exist', function(done){
        chai.request(server)
            .patch('/api/user/1')
            .set({'JWT-Token': token})
            .send({userName : "gsamuel"})
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response.body.userName).to.equal('gsamuel');
                expect(response).to.have.status(200);
                done();
            });
    });

    it('should not update if there is no information passed', function(done){
        chai.request(server)
            .patch('/api/user/5')
            .set({'JWT-Token': token})
            .send({})
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response).to.have.status(400);
                done();
            });
    });

    it('should not update if the user does not exist', function(done){
        chai.request(server)
            .patch('/api/user/2345323')
            .set({'JWT-Token': token})
            .send({userName : "gsamuel"})
            .end(function(error, response){
                expect(response).to.have.status(404);
                done();
            });
    });

    it.only('should raise an error if the update information is wrong', function(done){
        chai.request(server)
            .patch('/api/user/5')
            .set({'JWT-Token': token})
            .send({news: "test"})
            .end(function(error, response){
                console.log('the thing >>>>>>>',response);
                expect(response).to.have.status(400);
                done();
            });
    });

    it('should delete a user if they exist', function(done){
        chai.request(server)
            .del('/api/user/2')
            .set({'JWT-Token': token})
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response).to.have.status(204);
                done();
            });
    });

    it('should return if deleted user does not exist', function(done){
        chai.request(server)
            .del('/api/user/2345323')
            .set({'JWT-Token': token})
            .end(function(error, response){
                // ensure that the same user can't be created twice
                expect(response).to.have.status(404);
                done();
            });
    });

});