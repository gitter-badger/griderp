this.Account = new Mongo.Collection("account");

this.Account.userCanInsert = function(userId, doc) {
	return true;
}

this.Account.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Account.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.Account = new SimpleSchema({
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
	parent_account: {
		label: "Parent Account",
		type: String,
		optional: true
	},
	rgt: {
		label: "Right",
		type: Number,
		optional: true
	},
	root_type: {
		label: "Root Type",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	balance_must_be: {
		label: "Required Balance",
		type: String,
		optional: true
	},
	is_group: {
		label: "Is Group",
		type: Number,
		optional: true,
		defaultValue: 0
	},
	old_parent: {
		label: "Old Parent",
		type: String,
		optional: true
	},
	lft: {
		label: "Left",
		type: Number,
		optional: true
	},
	tax_rate: {
		label: "Tax Rate",
		type: Number,
		decimal: true,
		optional: true
	},
	report_type: {
		label: "Report Type",
		type: String,
		optional: true
	},
	warehouse: {
		label: "Warehouse",
		type: String,
		optional: true
	},
	account_currency: {
		label: "Account Currency",
		type: String,
		optional: true
	},
	account_type: {
		label: "Account Type",
		type: String,
		optional: true
	},
	freeze_account: {
		label: "Freeze Account",
		type: String,
		optional: true
	},
	account_name: {
		label: "Account Name",
		type: String,
		optional: true
	}
});

this.Account.attachSchema(this.Schemas.Account);
