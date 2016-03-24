this.Designation = new Mongo.Collection("designation");

this.Designation.userCanInsert = function(userId, doc) {
	return true;
}

this.Designation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Designation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Designation = new SimpleSchema({
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
	designation_name: {
		label: "Designation Name",
		type: String,
		optional: true
	}
});

this.Designation.attachSchema(this.Schemas.Designation);
