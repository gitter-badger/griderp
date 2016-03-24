this.ModuleDef = new Mongo.Collection("module_def");

this.ModuleDef.userCanInsert = function(userId, doc) {
	return true;
}

this.ModuleDef.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ModuleDef.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ModuleDef = new SimpleSchema({
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
	module_name: {
		label: "Module Name",
		type: String,
		optional: true
	},
	app_name: {
		label: "App Name",
		type: String,
		optional: true
	}
});

this.ModuleDef.attachSchema(this.Schemas.ModuleDef);
