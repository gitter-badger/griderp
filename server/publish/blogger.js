Meteor.publish("blogger_list", function(limit) {
	var defaultLimit = limit || 25;
	return Blogger.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("blogger_empty", function() {
	return Blogger.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("blogger_details", function(bloggerId) {
	return Blogger.find({ _id: bloggerId, ownerId: this.userId }, {});
});
