this.Report = new Mongo.Collection("report");

this.Report.userCanInsert = function(userId, doc) {
	return true;
}

this.Report.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Report.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Report = new SimpleSchema({
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
	apply_user_permissions: {
		label: "Apply User Permissions",
		type: Number,
		defaultValue: 1
	},
	javascript: {
		label: "Javascript",
		type: String,
		optional: true
	},
	report_type: {
		label: "Report Type",
		type: String,
		optional: true
	},
	ref_doctype: {
		label: "Ref Doctype",
		type: String,
		optional: true
	},
	module: {
		label: "Module",
		type: String,
		optional: true
	},
	report_name: {
		label: "Report Name",
		type: String,
		optional: true
	},
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	json: {
		label: "JSON",
		type: String,
		optional: true
	},
	is_standard: {
		label: "Is Standard",
		type: String,
		optional: true
	},
	add_total_row: {
		label: "Add Total Row",
		type: Number,
		defaultValue: 0
	},
	query: {
		label: "Query",
		type: String,
		optional: true
	}
});

this.Report.attachSchema(this.Schemas.Report);
