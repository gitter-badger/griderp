Meteor.publish("time_log_list", function(limit) {
	var defaultLimit = limit || 25;
	return TimeLog.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("time_log_empty", function() {
	return TimeLog.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("time_log_details", function(timeLogId) {
	return TimeLog.find({ _id: timeLogId, ownerId: this.userId }, {});
});
