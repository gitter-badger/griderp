Meteor.publish("activity_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return ActivityType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("activity_type_empty", function() {
	return ActivityType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("activity_type_details", function(activityTypeId) {
	return ActivityType.find({ _id: activityTypeId, ownerId: this.userId }, {});
});
