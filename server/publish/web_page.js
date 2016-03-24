Meteor.publish("web_page_list", function(limit) {
	var defaultLimit = limit || 25;
	return WebPage.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("web_page_empty", function() {
	return WebPage.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("web_page_details", function(webPageId) {
	return WebPage.find({ _id: webPageId, ownerId: this.userId }, {});
});
