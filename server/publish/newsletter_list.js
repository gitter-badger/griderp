Meteor.publish("newsletter_list_list", function(limit) {
	var defaultLimit = limit || 25;
	return NewsletterList.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("newsletter_list_empty", function() {
	return NewsletterList.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("newsletter_list_details", function(newsletterListId) {
	return NewsletterList.find({ _id: newsletterListId, ownerId: this.userId }, {});
});
