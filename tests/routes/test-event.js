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
        done();
    });

    it('should return an error if event body is empty', function(done){
        done();
    });

    // GET tests
    it('should return all events for a given user', function(done){
        done();
    });

    it('should return event when id is provided', function(done){
        done();
    });

    it('should return 404 if id provided is not available', function(done){
        done();
    });

    it('should return 401 Unauthorised if user is not authenticated', function(done){
        done();
    });

    it('should not return event if the user is different', function(done){
        done();
    });

    // PATCH tests
    it('should be able to update the event', function(done){
        done();
    });

    it('should not update the event if no information is provided', function(done){
        done();
    });

    it('should return a 400 Bad Request if wrong information is sent', function(done){
        done();
    });

    it('should not update if user is not the creator', function(done){
        done();
    });

    it('should not update if user is not authorised', function(done){
        done();
    });

    // DELETE tests
    it('should delete event if the id is right', function(done){
        done();
    });

    it('should return an error if the event does not exist', function(done){
        done();
    });

    it('should not delete if user is not the creator', function(done){
        done();
    });

    it('should return error if the event was deleted', function(done){
        done();
    });

    it('should not delete if user is not authorised', function(done){
        done();
    });

})
