this.EmployeeInternalWorkHistory = new Mongo.Collection("employee_internal_work_history");

this.EmployeeInternalWorkHistory.userCanInsert = function(userId, doc) {
	return true;
}

this.EmployeeInternalWorkHistory.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmployeeInternalWorkHistory.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmployeeInternalWorkHistory = new SimpleSchema({
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
	department: {
		label: "Department",
		type: String,
		optional: true
	},
	from_date: {
		label: "From Date",
		type: Date,
		optional: true
	},
	branch: {
		label: "Branch",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	to_date: {
		label: "To Date",
		type: Date,
		optional: true
	}
});

this.EmployeeInternalWorkHistory.attachSchema(this.Schemas.EmployeeInternalWorkHistory);
