this.WorkflowState = new Mongo.Collection("workflow_state");

this.WorkflowState.userCanInsert = function(userId, doc) {
	return true;
}

this.WorkflowState.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WorkflowState.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WorkflowState = new SimpleSchema({
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
	style: {
		label: "Style",
		type: String,
		optional: true
	},
	workflow_state_name: {
		label: "Workflow State Name",
		type: String,
		optional: true
	},
	icon: {
		label: "Icon",
		type: String,
		optional: true
	}
});

this.WorkflowState.attachSchema(this.Schemas.WorkflowState);
