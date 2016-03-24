Meteor.publish("scheduler_log_list", function(limit) {
	var defaultLimit = limit || 25;
	return SchedulerLog.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("scheduler_log_empty", function() {
	return SchedulerLog.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("scheduler_log_details", function(schedulerLogId) {
	return SchedulerLog.find({ _id: schedulerLogId, ownerId: this.userId }, {});
});
