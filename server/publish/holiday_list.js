Meteor.publish("holiday_list_list", function(limit) {
	var defaultLimit = limit || 25;
	return HolidayList.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("holiday_list_empty", function() {
	return HolidayList.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("holiday_list_details", function(holidayListId) {
	return HolidayList.find({ _id: holidayListId, ownerId: this.userId }, {});
});
