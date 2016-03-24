this.ExpenseClaim = new Mongo.Collection("expense_claim");

this.ExpenseClaim.userCanInsert = function(userId, doc) {
	return true;
}

this.ExpenseClaim.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ExpenseClaim.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ExpenseClaim = new SimpleSchema({
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
	total_claimed_amount: {
		label: "Total Claimed Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	email_id: {
		label: "Email Id",
		type: String,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true,
		defaultValue: "EXP"
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	approval_status: {
		label: "Approval Status",
		type: String,
		optional: true,
		defaultValue: "Draft"
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	total_sanctioned_amount: {
		label: "Total Sanctioned Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	employee: {
		label: "Employee",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	employee_name: {
		label: "Employee Name",
		type: String,
		optional: true
	},
	exp_approver: {
		label: "Expense Approver",
		type: String,
		optional: true
	},
	remark: {
		label: "Remark",
		type: String,
		optional: true
	},
	task: {
		label: "Task",
		type: String,
		optional: true
	},
	total_amount_reimbursed: {
		label: "Total Amount Reimbursed",
		type: Number,
		decimal: true,
		optional: true
	},
	project: {
		label: "Project",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	}
});

this.ExpenseClaim.attachSchema(this.Schemas.ExpenseClaim);
