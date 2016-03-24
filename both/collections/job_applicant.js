this.JobApplicant = new Mongo.Collection("job_applicant");

this.JobApplicant.userCanInsert = function(userId, doc) {
	return true;
}

this.JobApplicant.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.JobApplicant.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.JobApplicant = new SimpleSchema({
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
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	job_opening: {
		label: "Job Opening",
		type: String,
		optional: true
	},
	applicant_name: {
		label: "Applicant Name",
		type: String,
		optional: true
	}
});

this.JobApplicant.attachSchema(this.Schemas.JobApplicant);
