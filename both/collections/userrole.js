this.Userrole = new Mongo.Collection("userrole");

this.Userrole.userCanInsert = function(userId, doc) {
	return true;
}

this.Userrole.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Userrole.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Userrole = new SimpleSchema({
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
	role: {
		label: "Role",
		type: String,
		optional: true
	}
});

this.Userrole.attachSchema(this.Schemas.Userrole);
