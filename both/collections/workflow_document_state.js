this.WorkflowDocumentState = new Mongo.Collection("workflow_document_state");

this.WorkflowDocumentState.userCanInsert = function(userId, doc) {
	return true;
}

this.WorkflowDocumentState.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WorkflowDocumentState.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WorkflowDocumentState = new SimpleSchema({
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
	allow_edit: {
		label: "Allow Edit",
		type: String,
		optional: true
	},
	update_field: {
		label: "Update Field",
		type: String,
		optional: true
	},
	doc_status: {
		label: "Doc Status",
		type: String,
		optional: true
	},
	state: {
		label: "State",
		type: String,
		optional: true
	},
	message: {
		label: "Message",
		type: String,
		optional: true
	},
	update_value: {
		label: "Update Value",
		type: String,
		optional: true
	}
});

this.WorkflowDocumentState.attachSchema(this.Schemas.WorkflowDocumentState);
