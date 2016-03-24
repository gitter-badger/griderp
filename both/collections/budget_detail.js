this.BudgetDetail = new Mongo.Collection("budget_detail");

this.BudgetDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.BudgetDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BudgetDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BudgetDetail = new SimpleSchema({
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
	account: {
		label: "Account",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	budget_allocated: {
		label: "Budget Allocated",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.BudgetDetail.attachSchema(this.Schemas.BudgetDetail);
