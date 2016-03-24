Meteor.publish("comment_list", function(limit) {
	var defaultLimit = limit || 25;
	return Comment.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("comment_empty", function() {
	return Comment.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("comment_details", function(commentId) {
	return Comment.find({ _id: commentId, ownerId: this.userId }, {});
});
