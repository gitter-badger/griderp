this.PropertySetter = new Mongo.Collection("property_setter");

this.PropertySetter.userCanInsert = function(userId, doc) {
	return true;
}

this.PropertySetter.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PropertySetter.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PropertySetter = new SimpleSchema({
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
	default_value: {
		label: "Default Value",
		type: String,
		optional: true
	},
	doc_type: {
		label: "Document Type",
		type: String,
		optional: true
	},
	property: {
		label: "Property",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: String,
		optional: true
	},
	doctype_or_field: {
		label: "Doctype or Field",
		type: String,
		optional: true
	},
	property_type: {
		label: "Property Type",
		type: String,
		optional: true
	},
	field_name: {
		label: "Field Name",
		type: String,
		optional: true
	}
});

this.PropertySetter.attachSchema(this.Schemas.PropertySetter);
