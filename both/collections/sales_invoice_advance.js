this.SalesInvoiceAdvance = new Mongo.Collection("sales_invoice_advance");

this.SalesInvoiceAdvance.userCanInsert = function(userId, doc) {
	return true;
}

this.SalesInvoiceAdvance.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.SalesInvoiceAdvance.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.SalesInvoiceAdvance = new SimpleSchema({
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
	journal_entry: {
		label: "Journal Entry",
		type: String,
		optional: true
	},
	advance_amount: {
		label: "Advance Amount",
		type: Number,
		decimal: true,
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

this.SalesInvoiceAdvance.attachSchema(this.Schemas.SalesInvoiceAdvance);
