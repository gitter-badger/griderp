Meteor.publish("email_alert_list", function(limit) {
	var defaultLimit = limit || 25;
	return EmailAlert.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("email_alert_empty", function() {
	return EmailAlert.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("email_alert_details", function(emailAlertId) {
	return EmailAlert.find({ _id: emailAlertId, ownerId: this.userId }, {});
});
