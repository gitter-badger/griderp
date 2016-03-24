this.ExpenseClaimType = new Mongo.Collection("expense_claim_type");

this.ExpenseClaimType.userCanInsert = function(userId, doc) {
	return true;
}

this.ExpenseClaimType.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ExpenseClaimType.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ExpenseClaimType = new SimpleSchema({
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
	default_account: {
		label: "Default Account",
		type: String,
		optional: true
	},
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	expense_type: {
		label: "Expense Type",
		type: String,
		optional: true
	}
});

this.ExpenseClaimType.attachSchema(this.Schemas.ExpenseClaimType);
