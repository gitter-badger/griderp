this.Docperm = new Mongo.Collection("docperm");

this.Docperm.userCanInsert = function(userId, doc) {
	return true;
}

this.Docperm.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Docperm.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Docperm = new SimpleSchema({
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
	permlevel: {
		label: "Permission Level",
		type: Number,
		defaultValue: 0
	},
	role: {
		label: "Role",
		type: String,
		optional: true
	},
	match: {
		label: "Match",
		type: String,
		optional: true
	},
	read: {
		label: "Read",
		type: Number,
		defaultValue: 1
	},
	write: {
		label: "Write",
		type: Number,
		defaultValue: 1
	},
	create: {
		label: "Create",
		type: Number,
		defaultValue: 1
	},
	submit: {
		label: "Submit",
		type: Number,
		defaultValue: 0
	},
	cancel: {
		label: "Cancel",
		type: Number,
		defaultValue: 0
	},
	delete: {
		label: "Delete",
		type: Number,
		defaultValue: 1
	},
	amend: {
		label: "Amend",
		type: Number,
		defaultValue: 0
	},
	report: {
		label: "Report",
		type: Number,
		defaultValue: 1
	},
	export: {
		label: "Export",
		type: Number,
		defaultValue: 1
	},
	import: {
		label: "Import",
		type: Number,
		defaultValue: 0
	},
	share: {
		label: "Share",
		type: Number,
		defaultValue: 1
	},
	print: {
		label: "Print",
		type: Number,
		defaultValue: 1
	},
	email: {
		label: "Email",
		type: Number,
		defaultValue: 1
	},
	user_permission_doctypes: {
		label: "User Permission Doctypes",
		type: String,
		optional: true
	},
	set_user_permissions: {
		label: "Set User Permissions",
		type: Number,
		defaultValue: 0
	},
	apply_user_permissions: {
		label: "Apply User Permissions",
		type: Number,
		defaultValue: 0
	},
	if_owner: {
		label: "If Owner",
		type: Number,
		defaultValue: 0
	}
});

this.Docperm.attachSchema(this.Schemas.Docperm);
