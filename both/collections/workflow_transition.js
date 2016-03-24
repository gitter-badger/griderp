this.WorkflowTransition = new Mongo.Collection("workflow_transition");

this.WorkflowTransition.userCanInsert = function(userId, doc) {
	return true;
}

this.WorkflowTransition.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WorkflowTransition.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WorkflowTransition = new SimpleSchema({
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
	action: {
		label: "Action",
		type: String,
		optional: true
	},
	state: {
		label: "State",
		type: String,
		optional: true
	},
	next_state: {
		label: "Next State",
		type: String,
		optional: true
	},
	allowed: {
		label: "Allowed",
		type: String,
		optional: true
	}
});

this.WorkflowTransition.attachSchema(this.Schemas.WorkflowTransition);
