Meteor.publish("email_digest_list", function(limit) {
	var defaultLimit = limit || 25;
	return EmailDigest.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("email_digest_empty", function() {
	return EmailDigest.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("email_digest_details", function(emailDigestId) {
	return EmailDigest.find({ _id: emailDigestId, ownerId: this.userId }, {});
});
