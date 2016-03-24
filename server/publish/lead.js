Meteor.publish("lead_list", function(limit) {
	var defaultLimit = limit || 25;
	return Lead.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("lead_empty", function() {
	return Lead.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("lead_details", function(leadId) {
	return Lead.find({ _id: leadId, ownerId: this.userId }, {});
});
