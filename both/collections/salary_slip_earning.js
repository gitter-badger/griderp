this.SalarySlipEarning = new Mongo.Collection("salary_slip_earning");

this.SalarySlipEarning.userCanInsert = function(userId, doc) {
	return true;
}

this.SalarySlipEarning.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalarySlipEarning.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalarySlipEarning = new SimpleSchema({
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
	e_amount: {
		label: "E Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	e_modified_amount: {
		label: "E Modified Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	e_type: {
		label: "E Type",
		type: String,
		optional: true
	},
	e_depends_on_lwp: {
		label: "E Depends on LWP",
		type: Number,
		defaultValue: 0
	}
});

this.SalarySlipEarning.attachSchema(this.Schemas.SalarySlipEarning);
