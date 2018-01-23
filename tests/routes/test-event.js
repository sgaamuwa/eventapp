const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const Events = require('../../server/models').event;
const eventController = require('../../server/controllers').event;
const eventPayloads = require('../test_helpers/event-payloads');

chai.use(chaiHttp);

describe.only('Event controller tests', function(){

    before(function(done){
        // add events to the database for the tests
        Events.destroy({ where: {} })
             .then(function(){
                Events.bulkCreate(eventPayloads.getBulkCreate())
                .then(function(){
                    done();
                });
             });
    });

    after(function(done){
        Events.destroy({
            where: {}
        }).then(function(){
            done();
        });
    });

    // POST tests
    it('should create an event when all the information is given', function(done){
        chai.request(server)
            .post('/events')
            .send(eventPayloads.getValidPostEvent())
            .end(function(err, res){
                expect(res).to.have.status(201);
                done();
            });
    });

    it('should return an error if event body is empty', function(done){
        chai.request(server)
            .post('/events')
            .send({})
            .end(function(err, res){
                expect(res).to.have.status(400);
                done();
            });
    });

    // GET tests
    it('should return all events for a given user', function(done){
        chai.request(server)
            .get('/events')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(200);
                // check that it returns all events
                expect(res.body).to.have.length(4);
                done();
            });
    });

    it('should return event when id is provided', function(done){
        chai.request(server)
            .get('/event/1')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body.eventTitle).to.be("Play");
                done();
            });
    });

    it('should return 404 if id provided is not available', function(done){
        chai.request(server)
            .get('/event/647284')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should return 401 Unauthorised if user is not authenticated', function(done){
        chai.request(server)
            .get('/event/1')
            .end(function(err, res){
                expect(res).to.have.status(401);
                done();
            });
    });

    it('should not return event if the user is different', function(done){
        chai.request(server)
            .get('/event/1')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(403);
                done();
            });
    });

    // PATCH tests
    it('should be able to update the event', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({eventLabel: "New Label"})
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should not update the event if no information is provided', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({})
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should return a 400 Bad Request if wrong information is sent', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({eventMachine: "New Label"})
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should not update if user is not the creator', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({eventLabel: "New Label"})
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should not update if user is not authenticated', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({eventLabel: "New Label"})
            .set({'JWT-Token': "58923A99DJ29NIJDI3KSI3K48892JDLAO8502DI93"})
            .end(function(err, res){
                expect(res).to.have.status(401);
                done();
            });
    });

    // DELETE tests
    it('should delete event if the id is right', function(done){
        chai.request(server)
            .del('/event/3')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return an error if the event does not exist', function(done){
        chai.request(server)
            .del('/event/89174')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should not delete if user is not the creator', function(done){
        chai.request(server)
            .del('/event/1')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(403);
                done();
            });
    });

    it('should return error if the event was deleted', function(done){
        chai.request(server)
            .del('/event/2')
            .set({'JWT-Token': token})
            .end(function(err, res){
                expect(res).to.have.status(204);
                chai.request(server)
                    .del('/event/2')
                    .set({'JWT-Token': token})
                    .end(function(err, res){
                        expect(res).to.have.status(404);
                        done();
                    });
            });
    });

    it('should not delete if user is not authorised', function(done){
        chai.request(server)
            .patch('/event/1')
            .send({eventLabel: "New Label"})
            .set({'JWT-Token': "58923A99DJ29NIJDI3KSI3K48892JDLAO8502DI93"})
            .end(function(err, res){
                expect(res).to.have.status(401);
                done();
            });
    });

})
