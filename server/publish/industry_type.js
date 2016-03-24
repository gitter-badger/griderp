Meteor.publish("industry_type_list", function(limit) {
	var defaultLimit = limit || 25;
	return IndustryType.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("industry_type_empty", function() {
	return IndustryType.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("industry_type_details", function(industryTypeId) {
	return IndustryType.find({ _id: industryTypeId, ownerId: this.userId }, {});
});
