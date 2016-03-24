this.StockReconciliation = new Mongo.Collection("stock_reconciliation");

this.StockReconciliation.userCanInsert = function(userId, doc) {
	return true;
}

this.StockReconciliation.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.StockReconciliation.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.StockReconciliation = new SimpleSchema({
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
	difference_amount: {
		label: "Difference Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	reconciliation_json: {
		label: "Reconciliation JSON",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	posting_time: {
		label: "Posting Time",
		type: String,
		optional: true
	},
	expense_account: {
		label: "Expense Account",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	}
});

this.StockReconciliation.attachSchema(this.Schemas.StockReconciliation);
