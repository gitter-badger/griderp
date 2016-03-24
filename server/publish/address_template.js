Meteor.publish("address_template_list", function(limit) {
	var defaultLimit = limit || 25;
	return AddressTemplate.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("address_template_empty", function() {
	return AddressTemplate.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("address_template_details", function(addressTemplateId) {
	return AddressTemplate.find({ _id: addressTemplateId, ownerId: this.userId }, {});
});
