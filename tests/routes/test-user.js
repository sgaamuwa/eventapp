const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/routes');
const User = require('../../server/models').User;
const userController = require('../../server/controllers').user;

let userInput;
let request = {};

chai.use(chaiHttp);

describe('User Controller Tests', function(){
    before(function(done){
        userInput = [
            {
                firstName: "Samuel",
                lastName: "Gaamuwa",
                userName: "sgaamuwa",
                password: "pass123"
            },
            ,
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
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return an error if user information for creation is incomplete', function(){
        
    });

    it('should get a user if the right id is provided', function(){
        
    });

    it('should raise an error if the user is not available', function(){
        
    });

    it('', function(){
        
    });
});