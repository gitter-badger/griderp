Meteor.publish("activity_cost_list", function(limit) {
	var defaultLimit = limit || 25;
	return ActivityCost.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("activity_cost_empty", function() {
	return ActivityCost.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("activity_cost_details", function(activityCostId) {
	return ActivityCost.find({ _id: activityCostId, ownerId: this.userId }, {});
});
