this.ModeOfPaymentAccount = new Mongo.Collection("mode_of_payment_account");

this.ModeOfPaymentAccount.userCanInsert = function(userId, doc) {
	return true;
}

this.ModeOfPaymentAccount.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ModeOfPaymentAccount.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ModeOfPaymentAccount = new SimpleSchema({
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
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	default_account: {
		label: "Default Account",
		type: String,
		optional: true
	}
});

this.ModeOfPaymentAccount.attachSchema(this.Schemas.ModeOfPaymentAccount);
