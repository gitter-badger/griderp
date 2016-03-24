Meteor.publish("report_list", function(limit) {
	var defaultLimit = limit || 25;
	return Report.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("report_empty", function() {
	return Report.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("report_details", function(reportId) {
	return Report.find({ _id: reportId, ownerId: this.userId }, {});
});
