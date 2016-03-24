Meteor.publish("async_task_list", function(limit) {
	var defaultLimit = limit || 25;
	return AsyncTask.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("async_task_empty", function() {
	return AsyncTask.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("async_task_details", function(asyncTaskId) {
	return AsyncTask.find({ _id: asyncTaskId, ownerId: this.userId }, {});
});
