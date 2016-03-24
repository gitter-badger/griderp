Meteor.publish("newsletter_list", function(limit) {
	var defaultLimit = limit || 25;
	return Newsletter.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("newsletter_empty", function() {
	return Newsletter.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("newsletter_details", function(newsletterId) {
	return Newsletter.find({ _id: newsletterId, ownerId: this.userId }, {});
});
