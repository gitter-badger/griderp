this.EmploymentType = new Mongo.Collection("employment_type");

this.EmploymentType.userCanInsert = function(userId, doc) {
	return true;
}

this.EmploymentType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmploymentType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmploymentType = new SimpleSchema({
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
	employee_type_name: {
		label: "Employee Type Name",
		type: String,
		optional: true
	}
});

this.EmploymentType.attachSchema(this.Schemas.EmploymentType);
