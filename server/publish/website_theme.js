Meteor.publish("website_theme_list", function(limit) {
	var defaultLimit = limit || 25;
	return WebsiteTheme.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("website_theme_empty", function() {
	return WebsiteTheme.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("website_theme_details", function(websiteThemeId) {
	return WebsiteTheme.find({ _id: websiteThemeId, ownerId: this.userId }, {});
});
