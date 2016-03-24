this.WebFormField = new Mongo.Collection("web_form_field");

this.WebFormField.userCanInsert = function(userId, doc) {
	return true;
}

this.WebFormField.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.WebFormField.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.WebFormField = new SimpleSchema({
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
	read_only: {
		label: "Read Only",
		type: Number,
		defaultValue: 0
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	default: {
		label: "Default",
		type: String,
		optional: true
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	},
	fieldname: {
		label: "Field Name",
		type: String,
		optional: true
	},
	fieldtype: {
		label: "Field Type",
		type: String,
		optional: true
	},
	reqd: {
		label: "Required",
		type: Number,
		defaultValue: 0
	},
	hidden: {
		label: "Hidden",
		type: Number,
		defaultValue: 0
	},
	options: {
		label: "Options",
		type: String,
		optional: true
	}
});

this.WebFormField.attachSchema(this.Schemas.WebFormField);
