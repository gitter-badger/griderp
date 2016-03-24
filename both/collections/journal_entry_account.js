this.JournalEntryAccount = new Mongo.Collection("journal_entry_account");

this.JournalEntryAccount.userCanInsert = function(userId, doc) {
	return true;
}

this.JournalEntryAccount.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.JournalEntryAccount.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.JournalEntryAccount = new SimpleSchema({
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
	account: {
		label: "Account",
		type: String,
		optional: true
	},
	reference_name: {
		label: "Reference Name",
		type: String,
		optional: true
	},
	reference_type: {
		label: "Reference Type",
		type: String,
		optional: true
	},
	party_type: {
		label: "Party Type",
		type: String,
		optional: true
	},
	against_account: {
		label: "Against Account",
		type: String,
		optional: true
	},
	party_balance: {
		label: "Party Balance",
		type: Number,
		decimal: true,
		optional: true
	},
	credit: {
		label: "Credit",
		type: Number,
		decimal: true,
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
	party: {
		label: "Party",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	},
	balance: {
		label: "Balance",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.JournalEntryAccount.attachSchema(this.Schemas.JournalEntryAccount);
