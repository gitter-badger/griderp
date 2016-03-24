this.SalaryStructureDeduction = new Mongo.Collection("salary_structure_deduction");

this.SalaryStructureDeduction.userCanInsert = function(userId, doc) {
	return true;
}

this.SalaryStructureDeduction.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalaryStructureDeduction.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalaryStructureDeduction = new SimpleSchema({
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
	depend_on_lwp: {
		label: "Depend on LWP",
		type: Number,
		defaultValue: 0
	},
	d_type: {
		label: "D Type",
		type: String,
		optional: true
	},
	d_modified_amt: {
		label: "D Modified Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.SalaryStructureDeduction.attachSchema(this.Schemas.SalaryStructureDeduction);
