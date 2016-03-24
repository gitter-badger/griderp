Meteor.publish("workflow_action_list", function(limit) {
	var defaultLimit = limit || 25;
	return WorkflowAction.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("workflow_action_empty", function() {
	return WorkflowAction.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("workflow_action_details", function(workflowActionId) {
	return WorkflowAction.find({ _id: workflowActionId, ownerId: this.userId }, {});
});
