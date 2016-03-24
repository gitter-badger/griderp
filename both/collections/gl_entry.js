this.GlEntry = new Mongo.Collection("gl_entry");

this.GlEntry.userCanInsert = function(userId, doc) {
	return true;
}

this.GlEntry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.GlEntry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.GlEntry = new SimpleSchema({
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
	party: {
		label: "Party",
		type: String,
		optional: true
	},
	account: {
		label: "Account",
		type: String,
		optional: true
	},
	credit: {
		label: "Credit",
		type: Number,
		decimal: true,
		optional: true
	},
	party_type: {
		label: "Party Type",
		type: String,
		optional: true
	},
	against_voucher_type: {
		label: "Against Voucher Type",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	is_opening: {
		label: "Is Opening",
		type: String,
		optional: true
	},
	voucher_type: {
		label: "Voucher Type",
		type: String,
		optional: true
	},
	against: {
		label: "Against",
		type: String,
		optional: true
	},
	fiscal_year: {
		label: "Fiscal Year",
		type: String,
		optional: true
	},
	against_voucher: {
		label: "Against Voucher",
		type: String,
		optional: true
	},
	transaction_date: {
		label: "Transaction Date",
		type: Date,
		optional: true
	},
	is_advance: {
		label: "Is Advance",
		type: String,
		optional: true
	},
	debit: {
		label: "Debit",
		type: Number,
		decimal: true,
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
	voucher_no: {
		label: "Voucher Number",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	}
});

this.GlEntry.attachSchema(this.Schemas.GlEntry);
