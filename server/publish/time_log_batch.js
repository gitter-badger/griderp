Meteor.publish("time_log_batch_list", function(limit) {
	var defaultLimit = limit || 25;
	return TimeLogBatch.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("time_log_batch_empty", function() {
	return TimeLogBatch.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("time_log_batch_details", function(timeLogBatchId) {
	return TimeLogBatch.find({ _id: timeLogBatchId, ownerId: this.userId }, {});
});
