this.PatchLog = new Mongo.Collection("patch_log");

this.PatchLog.userCanInsert = function(userId, doc) {
	return true;
}

this.PatchLog.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PatchLog.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PatchLog = new SimpleSchema({
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
	patch: {
		label: "Patch",
		type: String,
		optional: true
	}
});

this.PatchLog.attachSchema(this.Schemas.PatchLog);
