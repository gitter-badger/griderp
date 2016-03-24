Meteor.publish("standard_reply_list", function(limit) {
	var defaultLimit = limit || 25;
	return StandardReply.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("standard_reply_empty", function() {
	return StandardReply.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("standard_reply_details", function(standardReplyId) {
	return StandardReply.find({ _id: standardReplyId, ownerId: this.userId }, {});
});
