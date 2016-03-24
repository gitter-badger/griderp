Meteor.publish("earning_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return EarningType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("earning_type_empty", function() {
	return EarningType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("earning_type_details", function(earningTypeId) {
	return EarningType.find({ _id: earningTypeId, ownerId: this.userId }, {});
});
