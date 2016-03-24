this.PeriodClosingVoucher = new Mongo.Collection("period_closing_voucher");

this.PeriodClosingVoucher.userCanInsert = function(userId, doc) {
	return true;
}

this.PeriodClosingVoucher.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PeriodClosingVoucher.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PeriodClosingVoucher = new SimpleSchema({
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
	closing_account_head: {
		label: "Closing Account Head",
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
	transaction_date: {
		label: "Transaction Date",
		type: Date,
		optional: true
	},
	remarks: {
		label: "Remarks",
		type: String,
		optional: true
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	}
});

this.PeriodClosingVoucher.attachSchema(this.Schemas.PeriodClosingVoucher);
