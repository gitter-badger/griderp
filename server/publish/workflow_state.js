Meteor.publish("workflow_state_list", function(limit) {
	var defaultLimit = limit || 25;
	return WorkflowState.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("workflow_state_empty", function() {
	return WorkflowState.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("workflow_state_details", function(workflowStateId) {
	return WorkflowState.find({ _id: workflowStateId, ownerId: this.userId }, {});
});
