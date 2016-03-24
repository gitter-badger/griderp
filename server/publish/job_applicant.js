Meteor.publish("job_applicant_list", function(limit) {
	var defaultLimit = limit || 25;
	return JobApplicant.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("job_applicant_empty", function() {
	return JobApplicant.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("job_applicant_details", function(jobApplicantId) {
	return JobApplicant.find({ _id: jobApplicantId, ownerId: this.userId }, {});
});
