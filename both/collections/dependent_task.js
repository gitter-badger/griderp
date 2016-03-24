this.DependentTask = new Mongo.Collection("dependent_task");

this.DependentTask.userCanInsert = function(userId, doc) {
	return true;
}

this.DependentTask.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.DependentTask.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.DependentTask = new SimpleSchema({
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
	task: {
		label: "Task",
		type: String,
		optional: true
	}
});

this.DependentTask.attachSchema(this.Schemas.DependentTask);
