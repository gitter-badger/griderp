Meteor.publish("appraisal_list", function(limit) {
	var defaultLimit = limit || 25;
	return Appraisal.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("appraisal_empty", function() {
	return Appraisal.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("appraisal_details", function(appraisalId) {
	return Appraisal.find({ _id: appraisalId, ownerId: this.userId }, {});
});
