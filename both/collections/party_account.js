this.PartyAccount = new Mongo.Collection("party_account");

this.PartyAccount.userCanInsert = function(userId, doc) {
	return true;
}

this.PartyAccount.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.PartyAccount.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.PartyAccount = new SimpleSchema({
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
	account: {
		label: "Account",
		type: String,
		optional: true
	}
});

this.PartyAccount.attachSchema(this.Schemas.PartyAccount);
