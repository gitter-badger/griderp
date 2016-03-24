this.AddressTemplate = new Mongo.Collection("address_template");

this.AddressTemplate.userCanInsert = function(userId, doc) {
	return true;
}

this.AddressTemplate.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AddressTemplate.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AddressTemplate = new SimpleSchema({
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
	is_default: {
		label: "Is Default",
		type: Number,
		defaultValue: 0
	},
	country: {
		label: "Country",
		type: String,
		optional: true
	},
	template: {
		label: "Template",
		type: String,
		optional: true
	}
});

this.AddressTemplate.attachSchema(this.Schemas.AddressTemplate);
