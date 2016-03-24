Meteor.publish("contact_list", function(limit) {
	var defaultLimit = limit || 25;
	return Contact.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("contact_empty", function() {
	return Contact.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("contact_details", function(contactId) {
	return Contact.find({ _id: contactId, ownerId: this.userId }, {});
});
