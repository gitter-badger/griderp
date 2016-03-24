this.Versions = new Mongo.Collection("versions");

this.Versions.userCanInsert = function(userId, doc) {
	return true;
}

this.Versions.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Versions.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Versions = new SimpleSchema({
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
	docname: {
		label: "Docname",
		type: String,
		optional: true
	},
	ref_doctype: {
		label: "Ref Doctype",
		type: String,
		optional: true
	},
	doclist_json: {
		label: "Doclist JSON",
		type: String,
		optional: true
	}
});

this.Versions.attachSchema(this.Schemas.Versions);
