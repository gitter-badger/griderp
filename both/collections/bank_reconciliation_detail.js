this.BankReconciliationDetail = new Mongo.Collection("bank_reconciliation_detail");

this.BankReconciliationDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.BankReconciliationDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.BankReconciliationDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.BankReconciliationDetail = new SimpleSchema({
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
	cheque_date: {
		label: "Cheque Date",
		type: Date,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	clearance_date: {
		label: "Clearance Date",
		type: Date,
		optional: true
	},
	reference_type: {
		label: "Reference Type",
		type: String,
		optional: true
	},
	credit: {
		label: "Credit",
		type: Number,
		decimal: true,
		optional: true
	},
	debit: {
		label: "Debit",
		type: Number,
		decimal: true,
		optional: true
	},
	voucher_id: {
		label: "Voucher Id",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	cheque_number: {
		label: "Cheque Number",
		type: String,
		optional: true
	},
	against_account: {
		label: "Against Account",
		type: String,
		optional: true
	}
});

this.BankReconciliationDetail.attachSchema(this.Schemas.BankReconciliationDetail);
