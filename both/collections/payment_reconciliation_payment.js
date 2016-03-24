this.PaymentReconciliationPayment = new Mongo.Collection("payment_reconciliation_payment");

this.PaymentReconciliationPayment.userCanInsert = function(userId, doc) {
	return true;
}

this.PaymentReconciliationPayment.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PaymentReconciliationPayment.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PaymentReconciliationPayment = new SimpleSchema({
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
	remark: {
		label: "Remark",
		type: String,
		optional: true
	},
	journal_entry: {
		label: "Journal Entry",
		type: String,
		optional: true
	},
	voucher_detail_number: {
		label: "Voucher Detail Number",
		type: String,
		optional: true
	},
	invoice_type: {
		label: "Invoice Type",
		type: String,
		optional: true,
		defaultValue: "Sales Invoice"
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	is_advance: {
		label: "Is Advance",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	invoice_number: {
		label: "Invoice Number",
		type: String,
		optional: true
	},
	allocated_amount: {
		label: "Allocated Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.PaymentReconciliationPayment.attachSchema(this.Schemas.PaymentReconciliationPayment);
