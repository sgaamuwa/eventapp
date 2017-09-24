const expect = require('chai').expect;
const User = require('../../server/models').User;

let mockUsers;

describe("User Model Tests", function(){
    before(function(done){
        mockUsers = [
            {
                id: "001",
                userName: "sgaamuwa",
                firstName: "Samuel",
                lastName: "Mwesigwa",
                password: "pass123"
            },
            {
                id: "002",
                userName: "aokoth",
                firstName: "Arnold",
                lastName: "Okoth",
                password: "pass123"
            },
            {
                id: "003",
                userName: "rwachira",
                firstName: "Rehema",
                lastName: "Wachira",
                password: "pass123"
            },
            {
                id: "004",
                userName: "kndegwa",
                firstName: "Kimani",
                lastName: "Ndegwa",
                password: "pass123"
            }
        ];
        User.destroy({ where: {}}).then(() => {
            done();
        });
    });
    
    afterEach(function(done){
        User.destroy({ where: {}}).then(() => {
            done();
        });
    });
    it("should add the user if all fields are provided", function(){
        return User.create(mockUsers[0]).then((user) => {
            return User.findAll().then((results) => {
                expect(results).to.have.lengthOf(1);
                expect(user.id).to.equal(1);
                expect(user.userName).to.equal("sgaamuwa");
                expect(user.firstName).to.equal("Samuel");
            });
        });
    });

    it("should delete a user if a correct id is provided", function(){
        return User.bulkCreate(mockUsers).then((users) => {
            return User.destroy({
                where: {
                    id: 3
                }
            }).then(() => {
                return User.findAll().then((results) => {
                    expect(users).to.have.lengthOf(4);
                    expect(results).to.have.lengthOf(3);
                })
            })
        });
    });
        
    it("should update the user if the id is exists", function(){
        return User.bulkCreate(mockUsers).then((users) => {
            return User.update(
                { firstName: "Brian"},
                { where: {
                    id: 4
                }}
            ).then(() => {
                return User.findOne({
                    where: {
                        id: 4
                    }
                }).then((user) => {
                    expect(users[3].firstName).to.equal('Kimani');
                    expect(users[3].lastName).to.equal('Ndegwa');
                    expect(user.firstName).to.equal('Brian');
                    expect(user.lastName).to.equal('Ndegwa');
                });
            });
        });
    });

    it("should find a particular user", function(){
        return User.bulkCreate(mockUsers).then(() => {
            return User.findOne({
                where:{
                    id: 3
                }
            }).then((user) => {
                expect(user.userName).to.equal('rwachira');
                expect(user.firstName).to.equal('Rehema');
                expect(user.lastName).to.equal('Wachira');
            });
        });
    });

    it("should find all users", function(){
        return User.bulkCreate(mockUsers).then(() => {
            return User.findAll().then((users) => {
                expect(users).to.have.lengthOf(4);
                expect(users[0].userName).to.equal('sgaamuwa');
                expect(users[1].userName).to.equal('aokoth');
                expect(users[2].userName).to.equal('rwachira');
                expect(users[3].userName).to.equal('kndegwa');
            });
        });
    });
});