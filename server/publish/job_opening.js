Meteor.publish("job_opening_list", function(limit) {
	var defaultLimit = limit || 25;
	return JobOpening.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("job_opening_empty", function() {
	return JobOpening.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("job_opening_details", function(jobOpeningId) {
	return JobOpening.find({ _id: jobOpeningId, ownerId: this.userId }, {});
});
