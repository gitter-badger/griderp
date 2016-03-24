this.Doctype = new Mongo.Collection("doctype");

this.Doctype.userCanInsert = function(userId, doc) {
	return true;
}

this.Doctype.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Doctype.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Doctype = new SimpleSchema({
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
	search_fields: {
		label: "Search Fields",
		type: String,
		optional: true
	},
	issingle: {
		label: "Is Single",
		type: Number,
		defaultValue: 0
	},
	istable: {
		label: "Is Table",
		type: Number,
		defaultValue: 0
	},
	version: {
		label: "Version",
		type: Number,
		optional: true
	},
	module: {
		label: "Module",
		type: String,
		optional: true
	},
	plugin: {
		label: "Plugin",
		type: String,
		optional: true
	},
	autoname: {
		label: "Auto Name",
		type: String,
		optional: true
	},
	name_case: {
		label: "Name Case",
		type: String,
		optional: true
	},
	title_field: {
		label: "Title Field",
		type: String,
		optional: true
	},
	sort_field: {
		label: "Sort Field",
		type: String,
		optional: true,
		defaultValue: "modified"
	},
	sort_order: {
		label: "Sort Order",
		type: String,
		optional: true,
		defaultValue: "DESC"
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	colour: {
		label: "Colour",
		type: String,
		optional: true
	},
	read_only: {
		label: "Read Only",
		type: Number,
		defaultValue: 0
	},
	in_create: {
		label: "In Create",
		type: Number,
		defaultValue: 0
	},
	menu_index: {
		label: "Menu Index",
		type: Number,
		optional: true
	},
	parent_node: {
		label: "Parent Node",
		type: String,
		optional: true
	},
	smallicon: {
		label: "Small Icon",
		type: String,
		optional: true
	},
	allow_copy: {
		label: "Allow Copy",
		type: Number,
		defaultValue: 0
	},
	allow_rename: {
		label: "Allow Rename",
		type: Number,
		defaultValue: 0
	},
	allow_import: {
		label: "Allow Import",
		type: Number,
		defaultValue: 0
	},
	hide_toolbar: {
		label: "Hide Toolbar",
		type: Number,
		defaultValue: 0
	},
	hide_heading: {
		label: "Hide Heading",
		type: Number,
		defaultValue: 0
	},
	max_attachments: {
		label: "Maximum Attachments",
		type: Number,
		optional: true
	},
	print_outline: {
		label: "Print Outline",
		type: String,
		optional: true
	},
	read_only_onload: {
		label: "Read Only Onload",
		type: Number,
		defaultValue: 0
	},
	in_dialog: {
		label: "In Dialog",
		type: Number,
		defaultValue: 0
	},
	document_type: {
		label: "Document Type",
		type: String,
		optional: true
	},
	icon: {
		label: "Icon",
		type: String,
		optional: true
	},
	tag_fields: {
		label: "Tag Fields",
		type: String,
		optional: true
	},
	subject: {
		label: "Subject",
		type: String,
		optional: true
	},
	_last_update: {
		label: "Last Update",
		type: String,
		optional: true
	},
	default_print_format: {
		label: "Default Print Format",
		type: String,
		optional: true
	},
	is_submittable: {
		label: "Is Submittable",
		type: Number,
		defaultValue: 0
	},
	_user_tags: {
		label: "User Tags",
		type: String,
		optional: true
	},
	custom: {
		label: "Custom",
		type: Number,
		defaultValue: 0
	}
});

this.Doctype.attachSchema(this.Schemas.Doctype);
