this.CustomizeFormField = new Mongo.Collection("customize_form_field");

this.CustomizeFormField.userCanInsert = function(userId, doc) {
	return true;
}

this.CustomizeFormField.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CustomizeFormField.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CustomizeFormField = new SimpleSchema({
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
	depends_on: {
		label: "Depends On",
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
	description: {
		label: "Description",
		type: String,
		optional: true
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
	is_custom_field: {
		label: "Is Custom Field",
		type: Number,
		defaultValue: 0
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

this.CustomizeFormField.attachSchema(this.Schemas.CustomizeFormField);
