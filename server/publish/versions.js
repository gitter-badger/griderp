Meteor.publish("versions_list", function(limit) {
	var defaultLimit = limit || 25;
	return Versions.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("versions_empty", function() {
	return Versions.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("versions_details", function(versionsId) {
	return Versions.find({ _id: versionsId, ownerId: this.userId }, {});
});
