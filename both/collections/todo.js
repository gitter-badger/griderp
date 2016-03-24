this.Todo = new Mongo.Collection("todo");

this.Todo.userCanInsert = function(userId, doc) {
	return true;
}

this.Todo.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Todo.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Todo = new SimpleSchema({
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
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Open"
	},
	date: {
		label: Date,
		type: Date,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	assigned_by: {
		label: "Assigned By",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	reference_type: {
		label: "Reference Type",
		type: String,
		optional: true
	},
	priority: {
		label: "Priority",
		type: String,
		optional: true,
		defaultValue: "Medium"
	},
	role: {
		label: "Role",
		type: String,
		optional: true
	},
	sender: {
		label: "Sender",
		type: String,
		optional: true
	}
});

this.Todo.attachSchema(this.Schemas.Todo);
