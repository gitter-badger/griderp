this.SalaryStructureEarning = new Mongo.Collection("salary_structure_earning");

this.SalaryStructureEarning.userCanInsert = function(userId, doc) {
	return true;
}

this.SalaryStructureEarning.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalaryStructureEarning.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalaryStructureEarning = new SimpleSchema({
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
	modified_value: {
		label: "Modified Value",
		type: Number,
		decimal: true,
		optional: true
	},
	e_type: {
		label: "E Type",
		type: String,
		optional: true
	}
});

this.SalaryStructureEarning.attachSchema(this.Schemas.SalaryStructureEarning);
