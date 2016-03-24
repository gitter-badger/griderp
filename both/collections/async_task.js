this.AsyncTask = new Mongo.Collection("async_task");

this.AsyncTask.userCanInsert = function(userId, doc) {
	return true;
}

this.AsyncTask.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AsyncTask.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AsyncTask = new SimpleSchema({
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
		optional: true
	},
	reference_doctype: {
		label: "Reference DocType",
		type: String,
		optional: true
	},
	stdout: {
		label: "Stdout",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	celery_task_id: {
		label: "Celery Task Id",
		type: String,
		optional: true
	},
	stderr: {
		label: "Stderr",
		type: String,
		optional: true
	}
});

this.AsyncTask.attachSchema(this.Schemas.AsyncTask);
