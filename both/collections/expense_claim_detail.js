this.ExpenseClaimDetail = new Mongo.Collection("expense_claim_detail");

this.ExpenseClaimDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.ExpenseClaimDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ExpenseClaimDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ExpenseClaimDetail = new SimpleSchema({
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
	description: {
		label: "Description",
		type: String,
		optional: true
	},
	claim_amount: {
		label: "Claim Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	sanctioned_amount: {
		label: "Sanctioned Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	expense_type: {
		label: "Expense Type",
		type: String,
		optional: true
	},
	default_account: {
		label: "Default Account",
		type: String,
		optional: true
	},
	expense_date: {
		label: "Expense Date",
		type: Date,
		optional: true
	}
});

this.ExpenseClaimDetail.attachSchema(this.Schemas.ExpenseClaimDetail);
