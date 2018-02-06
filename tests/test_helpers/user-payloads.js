function UserPayloads(){}
const payload = new UserPayloads();

UserPayloads.prototype.getBulkCreate = function getBulkCreate(){
    return [
        {
            id: "1",
            userName: "sgaamuwa",
            firstName: "Samuel",
            lastName: "Gaamuwa",
            password: "sha1$9340114d$1$17c5b600a20e677932d73e5f4687fb5dc1961345",
        },
        {
            id: "2",
            userName: "aokoth",
            firstName: "Arnold",
            lastName: "Okoth",
            password: "sha1$9340114d$1$17c5b600a20e677932d73e5f4687fb5dc1961345",
        },
        {
            id: "3",
            userName: "rwachira",
            firstName: "Rehema",
            lastName: "Wachira",
            password: "sha1$9340114d$1$17c5b600a20e677932d73e5f4687fb5dc1961345",
        },
        {
            id: "5",
            userName: "test",
            firstName: "Test FirstName",
            lastName: "Test LastName",
            password: "sha1$9340114d$1$17c5b600a20e677932d73e5f4687fb5dc1961345",
        },
    ]
}

UserPayloads.prototype.getValidPostUser = function getValidPostUser(){
    return {
        id: "4",
        userName: "kndegwa",
        firstName: "Kimani",
        lastName: "Ndegwa",
        password: "pass123",
    }
}

UserPayloads.prototype.getInvalidUserPosts = function getInvalidUserPosts(){
    return [
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
}

date = function(days){
    let date = new Date();
    date.setDate(date.getDate() + days);   
    return date;
}

module.exports = {
    getBulkCreate(){
        return payload.getBulkCreate();
    },
    getValidPostUser(){
        return payload.getValidPostUser();
    }
}