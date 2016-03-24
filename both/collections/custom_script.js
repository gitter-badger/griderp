this.CustomScript = new Mongo.Collection("custom_script");

this.CustomScript.userCanInsert = function(userId, doc) {
	return true;
}

this.CustomScript.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CustomScript.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CustomScript = new SimpleSchema({
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
	dt: {
		label: Date,
		type: String,
		optional: true
	},
	script: {
		label: "Script",
		type: String,
		optional: true
	},
	script_type: {
		label: "Script Type",
		type: String,
		optional: true,
		defaultValue: "Client"
	}
});

this.CustomScript.attachSchema(this.Schemas.CustomScript);
