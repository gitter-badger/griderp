Meteor.publish("user_list", function(limit) {
	var defaultLimit = limit || 25;
	return User.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("user_empty", function() {
	return User.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("user_details", function(userId) {
	return User.find({ _id: userId, ownerId: this.userId }, {});
});
