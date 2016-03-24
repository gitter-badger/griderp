Meteor.publish("workflow_list", function(limit) {
	var defaultLimit = limit || 25;
	return Workflow.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("workflow_empty", function() {
	return Workflow.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("workflow_details", function(workflowId) {
	return Workflow.find({ _id: workflowId, ownerId: this.userId }, {});
});
