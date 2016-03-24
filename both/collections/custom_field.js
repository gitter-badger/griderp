this.CustomField = new Mongo.Collection("custom_field");

this.CustomField.userCanInsert = function(userId, doc) {
	return true;
}

this.CustomField.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CustomField.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CustomField = new SimpleSchema({
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
	print_width: {
		label: "Print Width",
		type: String,
		optional: true
	},
	no_copy: {
		label: "No Copy",
		type: Number,
		defaultValue: 0
	},
	depends_on: {
		label: "Depends On",
		type: String,
		optional: true
	},
	in_list_view: {
		label: "In List View",
		type: Number,
		defaultValue: 0
	},
	reqd: {
		label: "Required",
		type: Number,
		defaultValue: 0
	},
	in_filter: {
		label: "In Filter",
		type: Number,
		defaultValue: 0
	},
	read_only: {
		label: "Read Only",
		type: Number,
		defaultValue: 0
	},
	print_hide: {
		label: "Print Hide",
		type: Number,
		defaultValue: 0
	},
	ignore_user_permissions: {
		label: "Ignore User Permissions",
		type: Number,
		defaultValue: 0
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	},
	width: {
		label: "Width",
		type: String,
		optional: true
	},
	hidden: {
		label: "Hidden",
		type: Number,
		defaultValue: 0
	},
	permlevel: {
		label: "Permission Level",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	insert_after: {
		label: "Insert After",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	search_index: {
		label: "Search Index",
		type: Number,
		defaultValue: 0
	},
	allow_on_submit: {
		label: "Allow On Submit",
		type: Number,
		defaultValue: 0
	},
	precision: {
		label: "Precision",
		type: String,
		optional: true
	},
	dt: {
		label: Date,
		type: String,
		optional: true
	},
	unique: {
		label: "Unique",
		type: Number,
		defaultValue: 0
	},
	default: {
		label: "Default",
		type: String,
		optional: true
	},
	fieldname: {
		label: "FieldName",
		type: String,
		optional: true
	},
	fieldtype: {
		label: "FieldType",
		type: String,
		optional: true,
		defaultValue: "Data"
	},
	options: {
		label: "Options",
		type: String,
		optional: true
	},
	report_hide: {
		label: "Report Hide",
		type: Number,
		defaultValue: 0
	}
});

this.CustomField.attachSchema(this.Schemas.CustomField);
