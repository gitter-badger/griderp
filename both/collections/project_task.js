this.ProjectTask = new Mongo.Collection("project_task");

this.ProjectTask.userCanInsert = function(userId, doc) {
	return true;
}

this.ProjectTask.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ProjectTask.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ProjectTask = new SimpleSchema({
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
	task_id: {
		label: "Task Id",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	end_date: {
		label: "End Date",
		type: Date,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	start_date: {
		label: "Start Date",
		type: Date,
		optional: true
	}
});

this.ProjectTask.attachSchema(this.Schemas.ProjectTask);
