Meteor.publish("sms_log_list", function(limit) {
	var defaultLimit = limit || 25;
	return SmsLog.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("sms_log_empty", function() {
	return SmsLog.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("sms_log_details", function(smsLogId) {
	return SmsLog.find({ _id: smsLogId, ownerId: this.userId }, {});
});
