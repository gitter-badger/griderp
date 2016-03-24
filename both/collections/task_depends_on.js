this.TaskDependsOn = new Mongo.Collection("task_depends_on");

this.TaskDependsOn.userCanInsert = function(userId, doc) {
	return true;
}

this.TaskDependsOn.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.TaskDependsOn.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.TaskDependsOn = new SimpleSchema({
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
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	}
});

this.TaskDependsOn.attachSchema(this.Schemas.TaskDependsOn);
