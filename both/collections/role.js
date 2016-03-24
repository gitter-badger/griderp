this.Role = new Mongo.Collection("role");

this.Role.userCanInsert = function(userId, doc) {
	return true;
}

this.Role.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Role.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Role = new SimpleSchema({
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
	role_name: {
		label: "Role Name",
		type: String,
		optional: true
	}
});

this.Role.attachSchema(this.Schemas.Role);
