function EventPayloads(){}
const payload = new EventPayloads();

EventPayloads.prototype.getBulkCreate = function getBulkCreate(){
    return [
        {
            id: "1",
            eventTitle: "Play",
            location: "National Theatre",
            availableSlots: "3",
            eventDate: date(2),
            eventLink: ""
        },
        {
            id: "2",
            eventTitle: "Rugby Game",
            location: "Rugby Stadium",
            availableSlots: "5",
            eventDate: date(4),
            eventLink: ""
        },
        {
            id: "3",
            eventTitle: "Skydiving",
            location: "The Sky",
            availableSlots: "4",
            eventDate: date(6),
            eventLink: ""
        }
    ]
}

EventPayloads.prototype.getValidPostEvent = function getValidPostEvent(){
    return {
        id: "4",
        eventTitle: "Pizza",
        location: "Dominos",
        availableSlots: "5",
        eventDate: date(2),
        eventLink: ""
    }
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
    getValidPostEvent(){
        return payload.getValidPostEvent();
    }
}