this.CFormInvoiceDetail = new Mongo.Collection("c_form_invoice_detail");

this.CFormInvoiceDetail.userCanInsert = function(userId, doc) {
	return true;
}

this.CFormInvoiceDetail.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.CFormInvoiceDetail.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.CFormInvoiceDetail = new SimpleSchema({
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
	territory: {
		label: "Territory",
		type: String,
		optional: true
	},
	grand_total: {
		label: "Grand Total",
		type: Number,
		decimal: true,
		optional: true
	},
	net_total: {
		label: "Net Total",
		type: Number,
		decimal: true,
		optional: true
	},
	invoice_date: {
		label: "Invoice Date",
		type: Date,
		optional: true
	},
	invoice_no: {
		label: "Invoice Number",
		type: String,
		optional: true
	}
});

this.CFormInvoiceDetail.attachSchema(this.Schemas.CFormInvoiceDetail);
