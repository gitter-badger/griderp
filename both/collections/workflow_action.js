this.WorkflowAction = new Mongo.Collection("workflow_action");

this.WorkflowAction.userCanInsert = function(userId, doc) {
	return true;
}

this.WorkflowAction.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WorkflowAction.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WorkflowAction = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	},
	docstatus: {
		label: "Doc Status",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	parent: {
		label: "Parent",
		type: String,
		optional: true
	},
	parentfield: {
		label: "Parent Field",
		type: String,
		optional: true
	},
	parenttype: {
		label: "Parent Type",
		type: String,
		optional: true
	},
	idx: {
		label: "Index",
		type: Number,
		optional: true
	},
	workflow_action_name: {
		label: "Workflow Action Name",
		type: String,
		optional: true
	}
});

this.WorkflowAction.attachSchema(this.Schemas.WorkflowAction);
