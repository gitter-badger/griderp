this.PaymentReconciliationInvoice = new Mongo.Collection("payment_reconciliation_invoice");

this.PaymentReconciliationInvoice.userCanInsert = function(userId, doc) {
	return true;
}

this.PaymentReconciliationInvoice.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PaymentReconciliationInvoice.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PaymentReconciliationInvoice = new SimpleSchema({
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
	invoice_type: {
		label: "Invoice Type",
		type: String,
		optional: true
	},
	invoice_date: {
		label: "Invoice Date",
		type: Date,
		optional: true
	},
	outstanding_amount: {
		label: "Outstanding Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	amount: {
		label: "Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	invoice_number: {
		label: "Invoice Number",
		type: String,
		optional: true
	}
});

this.PaymentReconciliationInvoice.attachSchema(this.Schemas.PaymentReconciliationInvoice);
