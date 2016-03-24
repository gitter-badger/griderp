this.Operation = new Mongo.Collection("operation");

this.Operation.userCanInsert = function(userId, doc) {
	return true;
}

this.Operation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Operation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Operation = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	operation: {
		label: "Operation",
		type: String,
		optional: true
	},
	workstation: {
		label: "Workstation",
		type: String,
		optional: true
	}
});

this.Operation.attachSchema(this.Schemas.Operation);
