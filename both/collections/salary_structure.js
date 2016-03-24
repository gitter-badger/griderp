this.SalaryStructure = new Mongo.Collection("salary_structure");

this.SalaryStructure.userCanInsert = function(userId, doc) {
	return true;
}

this.SalaryStructure.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalaryStructure.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalaryStructure = new SimpleSchema({
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
	to_date: {
		label: "To Date",
		type: Date,
		optional: true
	},
	total_earning: {
		label: "Total Earning",
		type: Number,
		decimal: true,
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
	department: {
		label: "Department",
		type: String,
		optional: true
	},
	total_deduction: {
		label: "Total Deduction",
		type: Number,
		decimal: true,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	is_active: {
		label: "Is Active",
		type: String,
		optional: true,
		defaultValue: "Yes"
	},
	net_pay: {
		label: "Net Pay",
		type: Number,
		decimal: true,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	}
});

this.SalaryStructure.attachSchema(this.Schemas.SalaryStructure);
