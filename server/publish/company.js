Meteor.publish("company_list", function(limit) {
	var defaultLimit = limit || 25;
	return Company.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("company_empty", function() {
	return Company.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("company_details", function(companyId) {
	return Company.find({ _id: companyId, ownerId: this.userId }, {});
});
