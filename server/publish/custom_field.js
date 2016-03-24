Meteor.publish("custom_field_list", function(limit) {
	var defaultLimit = limit || 25;
	return CustomField.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("custom_field_empty", function() {
	return CustomField.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("custom_field_details", function(customFieldId) {
	return CustomField.find({ _id: customFieldId, ownerId: this.userId }, {});
});
