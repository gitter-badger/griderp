this.PrintFormat = new Mongo.Collection("print_format");

this.PrintFormat.userCanInsert = function(userId, doc) {
	return true;
}

this.PrintFormat.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PrintFormat.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PrintFormat = new SimpleSchema({
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
	doc_type: {
		label: "Document Type",
		type: String,
		optional: true
	},
	print_format_builder: {
		label: "Print Format Builder",
		type: Number,
		defaultValue: 0
	},
	standard: {
		label: "Standard",
		type: String,
		optional: true,
		defaultValue: "No"
	},
	disabled: {
		label: "Disabled",
		type: Number,
		defaultValue: 0
	},
	html: {
		label: "HTML",
		type: String,
		optional: true
	},
	custom_format: {
		label: "Custom Format",
		type: Number,
		defaultValue: 0
	},
	font: {
		label: "Font",
		type: String,
		optional: true,
		defaultValue: "Default"
	},
	print_format_type: {
		label: "Print Format Type",
		type: String,
		optional: true,
		defaultValue: "Server"
	},
	format_data: {
		label: "Format Data",
		type: String,
		optional: true
	}
});

this.PrintFormat.attachSchema(this.Schemas.PrintFormat);
