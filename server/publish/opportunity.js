Meteor.publish("opportunity_list", function(limit) {
	var defaultLimit = limit || 25;
	return Opportunity.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("opportunity_empty", function() {
	return Opportunity.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("opportunity_details", function(opportunityId) {
	return Opportunity.find({ _id: opportunityId, ownerId: this.userId }, {});
});
