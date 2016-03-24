Meteor.publish("system_user_list", function(limit) {
	var defaultLimit = limit || 25;
	return Users.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("system_user_empty", function() {
	return Users.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("system_user_details", function(systemUserId) {
	return Users.find({ _id: systemUserId, ownerId: this.userId }, {});
});
