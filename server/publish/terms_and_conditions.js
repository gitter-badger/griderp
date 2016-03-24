Meteor.publish("terms_and_conditions_list", function(limit) {
	var defaultLimit = limit || 25;
	return TermsAndConditions.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("terms_and_conditions_empty", function() {
	return TermsAndConditions.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("terms_and_conditions_details", function(termsAndConditionsId) {
	return TermsAndConditions.find({ _id: termsAndConditionsId, ownerId: this.userId }, {});
});
