Meteor.publish("blog_post_list", function(limit) {
	var defaultLimit = limit || 25;
	return BlogPost.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("blog_post_empty", function() {
	return BlogPost.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("blog_post_details", function(blogPostId) {
	return BlogPost.find({ _id: blogPostId, ownerId: this.userId }, {});
});
