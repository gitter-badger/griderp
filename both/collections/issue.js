this.Issue = new Mongo.Collection("issue");

this.Issue.userCanInsert = function(userId, doc) {
	return true;
}

this.Issue.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Issue.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Issue = new SimpleSchema({
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
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	opening_date: {
		label: "Opening Date",
		type: Date,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	},
	raised_by: {
		label: "Raised By",
		type: String,
		optional: true
	},
	first_responded_on: {
		label: "First Responded On",
		type: Date,
		optional: true
	},
	lead: {
		label: "Lead",
		type: String,
		optional: true
	},
	attachment: {
		label: "Attachment",
		type: String,
		optional: true
	},
	opening_time: {
		label: "Opening Time",
		type: String,
		optional: true
	},
	customer_name: {
		label: "Customer Name",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: String,
		optional: true,
		defaultValue: "Open"
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	content_type: {
		label: "Content Type",
		type: String,
		optional: true
	},
	resolution_details: {
		label: "Resolution Details",
		type: String,
		optional: true
	},
	resolution_date: {
		label: "Resolution Date",
		type: Date,
		optional: true
	},
	customer: {
		label: "Customer",
		type: String,
		optional: true
	},
	contact: {
		label: "Contact",
		type: String,
		optional: true
	}
});

this.Issue.attachSchema(this.Schemas.Issue);
