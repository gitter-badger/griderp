this.PurchaseInvoiceAdvance = new Mongo.Collection("purchase_invoice_advance");

this.PurchaseInvoiceAdvance.userCanInsert = function(userId, doc) {
	return true;
}

this.PurchaseInvoiceAdvance.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PurchaseInvoiceAdvance.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PurchaseInvoiceAdvance = new SimpleSchema({
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
	advance_amount: {
		label: "Advance Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	journal_entry: {
		label: "Journal Entry",
		type: String,
		optional: true
	},
	remarks: {
		label: "Remarks",
		type: String,
		optional: true
	},
	allocated_amount: {
		label: "Allocated Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	jv_detail_no: {
		label: "JV Detail Number",
		type: String,
		optional: true
	}
});

this.PurchaseInvoiceAdvance.attachSchema(this.Schemas.PurchaseInvoiceAdvance);
