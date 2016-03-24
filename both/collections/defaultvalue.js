this.Defaultvalue = new Mongo.Collection("defaultvalue");

this.Defaultvalue.userCanInsert = function(userId, doc) {
	return true;
}

this.Defaultvalue.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Defaultvalue.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Defaultvalue = new SimpleSchema({
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
	defvalue: {
		label: "Default Value",
		type: String,
		optional: true
	},
	defkey: {
		label: "Default Key",
		type: String,
		optional: true
	}
});

this.Defaultvalue.attachSchema(this.Schemas.Defaultvalue);
