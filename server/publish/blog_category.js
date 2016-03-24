Meteor.publish("blog_category_list", function(limit) {
	var defaultLimit = limit || 25;
	return BlogCategory.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("blog_category_empty", function() {
	return BlogCategory.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("blog_category_details", function(blogCategoryId) {
	return BlogCategory.find({ _id: blogCategoryId, ownerId: this.userId }, {});
});
