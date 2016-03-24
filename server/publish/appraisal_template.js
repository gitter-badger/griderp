Meteor.publish("appraisal_template_list", function(limit) {
	var defaultLimit = limit || 25;
	return AppraisalTemplate.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("appraisal_template_empty", function() {
	return AppraisalTemplate.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("appraisal_template_details", function(appraisalTemplateId) {
	return AppraisalTemplate.find({ _id: appraisalTemplateId, ownerId: this.userId }, {});
});
