this.Workflow = new Mongo.Collection("workflow");

this.Workflow.userCanInsert = function(userId, doc) {
	return true;
}

this.Workflow.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Workflow.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Workflow = new SimpleSchema({
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
	workflow_name: {
		label: "Workflow Name",
		type: String,
		optional: true
	},
	is_active: {
		label: "Is Active",
		type: Number,
		defaultValue: 0
	},
	workflow_state_field: {
		label: "Workflow State Field",
		type: String,
		optional: true,
		defaultValue: "workflow_state"
	},
	document_type: {
		label: "Document Type",
		type: String,
		optional: true
	}
});

this.Workflow.attachSchema(this.Schemas.Workflow);
