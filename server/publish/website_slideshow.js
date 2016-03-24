Meteor.publish("website_slideshow_list", function(limit) {
	var defaultLimit = limit || 25;
	return WebsiteSlideshow.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("website_slideshow_empty", function() {
	return WebsiteSlideshow.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("website_slideshow_details", function(websiteSlideshowId) {
	return WebsiteSlideshow.find({ _id: websiteSlideshowId, ownerId: this.userId }, {});
});
