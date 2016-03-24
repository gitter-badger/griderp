this.EmployeeExternalWorkHistory = new Mongo.Collection("employee_external_work_history");

this.EmployeeExternalWorkHistory.userCanInsert = function(userId, doc) {
	return true;
}

this.EmployeeExternalWorkHistory.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.EmployeeExternalWorkHistory.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.EmployeeExternalWorkHistory = new SimpleSchema({
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
	salary: {
		label: "Salary",
		type: Number,
		decimal: true,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	contact: {
		label: "Contact",
		type: String,
		optional: true
	},
	company_name: {
		label: "Company Name",
		type: String,
		optional: true
	},
	address: {
		label: "Address",
		type: String,
		optional: true
	},
	total_experience: {
		label: "Total Experience",
		type: String,
		optional: true
	}
});

this.EmployeeExternalWorkHistory.attachSchema(this.Schemas.EmployeeExternalWorkHistory);
