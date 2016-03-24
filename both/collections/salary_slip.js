this.SalarySlip = new Mongo.Collection("salary_slip");

this.SalarySlip.userCanInsert = function(userId, doc) {
	return true;
}

this.SalarySlip.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalarySlip.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalarySlip = new SimpleSchema({
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
	payment_days: {
		label: "Payment Days",
		type: Number,
		decimal: true,
		optional: true
	},
	total_in_words: {
		label: "Total In Words",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	month: {
		label: "Month",
		type: String,
		optional: true
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	total_days_in_month: {
		label: "Total Days in Month",
		type: Number,
		decimal: true,
		optional: true
	},
	leave_encashment_amount: {
		label: "Leave Encashment Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	email_check: {
		label: "Email Check",
		type: Number,
		defaultValue: 0
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	branch: {
		label: "Branch",
		type: String,
		optional: true
	},
	leave_without_pay: {
		label: "Leave Without Pay",
		type: Number,
		decimal: true,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	bank_name: {
		label: "Bank Name",
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
	net_pay: {
		label: "Net Pay",
		type: Number,
		decimal: true,
		optional: true
	},
	department: {
		label: "Department",
		type: String,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	bank_account_no: {
		label: "Bank Account Number",
		type: String,
		optional: true
	},
	designation: {
		label: "Designation",
		type: String,
		optional: true
	},
	rounded_total: {
		label: "Rounded Total",
		type: Number,
		decimal: true,
		optional: true
	},
	gross_pay: {
		label: "Gross Pay",
		type: Number,
		decimal: true,
		optional: true
	},
	arrear_amount: {
		label: "Arrear Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalarySlip.attachSchema(this.Schemas.SalarySlip);
