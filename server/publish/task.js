Meteor.publish("task_list", function(limit) {
	var defaultLimit = limit || 25;
	return Task.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("task_empty", function() {
	return Task.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("task_details", function(taskId) {
	return Task.find({ _id: taskId, ownerId: this.userId }, {});
});
