this.SalarySlipDeduction = new Mongo.Collection("salary_slip_deduction");

this.SalarySlipDeduction.userCanInsert = function(userId, doc) {
	return true;
}

this.SalarySlipDeduction.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalarySlipDeduction.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalarySlipDeduction = new SimpleSchema({
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
	d_depends_on_lwp: {
		label: "D Depends on LWP",
		type: Number,
		defaultValue: 0
	},
	d_modified_amount: {
		label: "D Modified Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	d_type: {
		label: "D Type",
		type: String,
		optional: true
	},
	d_amount: {
		label: "D Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalarySlipDeduction.attachSchema(this.Schemas.SalarySlipDeduction);
