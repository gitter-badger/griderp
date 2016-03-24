this.Department = new Mongo.Collection("department");

this.Department.userCanInsert = function(userId, doc) {
	return true;
}

this.Department.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Department.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Department = new SimpleSchema({
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
	leave_block_list: {
		label: "Leave Block List",
		type: String,
		optional: true
	},
	department_name: {
		label: "Department Name",
		type: String,
		optional: true
	}
});

this.Department.attachSchema(this.Schemas.Department);
