Meteor.publish("page_list", function(limit) {
	var defaultLimit = limit || 25;
	return Page.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("page_empty", function() {
	return Page.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("page_details", function(pageId) {
	return Page.find({ _id: pageId, ownerId: this.userId }, {});
});
