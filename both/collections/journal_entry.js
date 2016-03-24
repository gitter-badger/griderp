this.JournalEntry = new Mongo.Collection("journal_entry");

this.JournalEntry.userCanInsert = function(userId, doc) {
	return true;
}

this.JournalEntry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.JournalEntry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.JournalEntry = new SimpleSchema({
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
	write_off_amount: {
		label: "Write Off Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	naming_series: {
		label: "Naming Series",
		type: String,
		optional: true
	},
	cheque_date: {
		label: "Cheque Date",
		type: Date,
		optional: true
	},
	total_amount_in_words: {
		label: "Total Amount In Words",
		type: String,
		optional: true
	},
	voucher_type: {
		label: "Voucher Type",
		type: String,
		optional: true,
		defaultValue: "Journal Entry"
	},
	letter_head: {
		label: "Letter Head",
		type: String,
		optional: true
	},
	cheque_no: {
		label: "Cheque Number",
		type: String,
		optional: true
	},
	bill_no: {
		label: "Bill Number",
		type: String,
		optional: true
	},
	user_remark: {
		label: "User Remark",
		type: String,
		optional: true
	},
	title: {
		label: "Title",
		type: String,
		optional: true
	},
	amended_from: {
		label: "Amended From",
		type: String,
		optional: true
	},
	bill_date: {
		label: "Bill Date",
		type: Date,
		optional: true
	},
	due_date: {
		label: "Due Date",
		type: Date,
		optional: true
	},
	clearance_date: {
		label: "Clearance Date",
		type: Date,
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
	total_credit: {
		label: "Total Credit",
		type: Number,
		decimal: true,
		optional: true
	},
	difference: {
		label: "Difference",
		type: Number,
		decimal: true,
		optional: true
	},
	pay_to_recd_from: {
		label: "Pay To Received From",
		type: String,
		optional: true
	},
	remark: {
		label: "Remark",
		type: String,
		optional: true
	},
	total_amount: {
		label: "Total Amount",
		type: Number,
		decimal: true,
		optional: true
	},
	write_off_based_on: {
		label: "Write Off Based On",
		type: String,
		optional: true,
		defaultValue: "Accounts Receivable"
	},
	select_print_heading: {
		label: "Select Print Heading",
		type: String,
		optional: true
	},
	stock_entry: {
		label: "Stock Entry",
		type: String,
		optional: true
	},
	total_debit: {
		label: "Total Debit",
		type: Number,
		decimal: true,
		optional: true
	},
	is_opening: {
		label: "Is Opening",
		type: String,
		optional: true,
		defaultValue: "No"
	},
	posting_date: {
		label: "Posting Date",
		type: Date,
		optional: true
	}
});

this.JournalEntry.attachSchema(this.Schemas.JournalEntry);

// Indexes
//JournalEntry._ensureIndex({name: 1}, {unique: 1});
//JournalEntry._ensureIndex({fiscal_year: 1});
//JournalEntry._ensureIndex({cheque_no: 1});
//JournalEntry._ensureIndex({company: 1});
//JournalEntry._ensureIndex({clearance_date: 1});
//JournalEntry._ensureIndex({voucher_type: 1});
//JournalEntry._ensureIndex({is_opening: 1});
//JournalEntry._ensureIndex({posting_date: 1});
//JournalEntry._ensureIndex({parent: 1});

