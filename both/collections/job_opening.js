this.JobOpening = new Mongo.Collection("job_opening");

this.JobOpening.userCanInsert = function(userId, doc) {
	return true;
}

this.JobOpening.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.JobOpening.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.JobOpening = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	job_title: {
		label: "Job Title",
		type: String,
		optional: true
	}
});

this.JobOpening.attachSchema(this.Schemas.JobOpening);
