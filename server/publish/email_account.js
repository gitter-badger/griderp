Meteor.publish("email_account_list", function(limit) {
	var defaultLimit = limit || 25;
	return EmailAccount.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("email_account_empty", function() {
	return EmailAccount.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("email_account_details", function(emailAccountId) {
	return EmailAccount.find({ _id: emailAccountId, ownerId: this.userId }, {});
});
