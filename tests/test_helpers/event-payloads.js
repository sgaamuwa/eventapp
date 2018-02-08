function EventPayloads() { }
const payload = new EventPayloads();

EventPayloads.prototype.getBulkCreate = function getBulkCreate() {
	return [
		{
			id: "1",
			eventTitle: "Play",
			location: "National Theatre",
			availableSlots: "3",
			eventDate: date(2),
			eventLink: "",
			userId: "5"
		},
		{
			id: "2",
			eventTitle: "Rugby Game",
			location: "Rugby Stadium",
			availableSlots: "5",
			eventDate: date(4),
			eventLink: "",
			userId: "5"
		},
		{
			id: "3",
			eventTitle: "Skydiving",
			location: "The Sky",
			availableSlots: "4",
			eventDate: date(6),
			eventLink: "",
			userId: "5"
		}
	]
}

EventPayloads.prototype.getValidPostEvent = function getValidPostEvent() {
	return {
		eventTitle: "Pizza",
		location: "Dominos",
		availableSlots: "5",
		eventDate: date(2),
		eventLink: ""
	}
}

date = function (days) {
	let date = new Date();
	date.setDate(date.getDate() + days);
	return date;
}

module.exports = {
	getBulkCreate() {
		return payload.getBulkCreate();
	},
	getValidPostEvent() {
		return payload.getValidPostEvent();
	}
}