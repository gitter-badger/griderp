Meteor.publish("role_list", function(limit) {
	var defaultLimit = limit || 25;
	return Role.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("role_empty", function() {
	return Role.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("role_details", function(roleId) {
	return Role.find({ _id: roleId, ownerId: this.userId }, {});
});
