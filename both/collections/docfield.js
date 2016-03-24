this.Docfield = new Mongo.Collection("docfield");

this.Docfield.userCanInsert = function(userId, doc) {
	return true;
}

this.Docfield.userCanUpdate = function(userId, doc) {
	return userId && doc. ownerId == userId;
}

this.Docfield.userCanRemove = function(userId, doc) {
	return userId && doc. ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Docfield = new SimpleSchema({
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
	fieldname: {
		label: "FieldName",
		type: String,
		optional: true
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	},
	oldfieldname: {
		label: "OldFieldName",
		type: String,
		optional: true
	},
	fieldtype: {
		label: "FieldType",
		type: String,
		optional: true,
		defaultValue: "Data"
	},
	oldfieldtype: {
		label: "OldFieldType",
		type: String,
		optional: true
	},
	options: {
		label: "Options",
		type: String,
		optional: true
	},
	search_index: {
		label: "Search Index",
		type: Number,
		defaultValue: 0
	},
	hidden: {
		label: "Hidden",
		type: Number,
		defaultValue: 0
	},
	set_only_once: {
		label: "Set Only Once",
		type: Number,
		defaultValue: 0
	},
	print_hide: {
		label: "Print Hide",
		type: Number,
		defaultValue: 0
	},
	report_hide: {
		label: "Report Hide",
		type: Number,
		defaultValue: 0
	},
	reqd: {
		label: "Required",
		type: Number,
		defaultValue: 0
	},
	unique: {
		label: "Unique",
		type: Number,
		defaultValue: 0
	},
	no_copy: {
		label: "No Copy",
		type: Number,
		defaultValue: 0
	},
	allow_on_submit: {
		label: "Allow On Submit",
		type: Number,
		defaultValue: 0
	},
	trigger: {
		label: "Trigger",
		type: String,
		optional: true
	},
	depends_on: {
		label: "Depends On",
		type: String,
		optional: true
	},
	permlevel: {
		label: "Permission Level",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	ignore_user_permissions: {
		label: "Ignore User Permissions",
		type: Number,
		defaultValue: 0
	},
	width: {
		label: "Width",
		type: String,
		optional: true
	},
	print_width: {
		label: "Print Width",
		type: String,
		optional: true
	},
	default: {
		label: "Default",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	in_filter: {
		label: "In Filter",
		type: Number,
		defaultValue: 0
	},
	in_list_view: {
		label: "In List View",
		type: Number,
		defaultValue: 0
	},
	read_only: {
		label: "Read Only",
		type: Number,
		defaultValue: 0
	},
	precision: {
		label: "Precision",
		type: String,
		optional: true
	}
});

this.Docfield.attachSchema(this.Schemas.Docfield);
