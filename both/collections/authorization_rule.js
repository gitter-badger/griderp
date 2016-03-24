this.AuthorizationRule = new Mongo.Collection("authorization_rule");

this.AuthorizationRule.userCanInsert = function(userId, doc) {
	return true;
}

this.AuthorizationRule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.AuthorizationRule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.AuthorizationRule = new SimpleSchema({
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
	approving_user: {
		label: "Approving User",
		type: String,
		optional: true
	},
	transaction: {
		label: "Transaction",
		type: String,
		optional: true
	},
	system_user: {
		label: "System User",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	master_name: {
		label: "Master Name",
		type: String,
		optional: true
	},
	value: {
		label: "Value",
		type: Number,
		decimal: true,
		optional: true
	},
	to_emp: {
		label: "To Employee",
		type: String,
		optional: true
	},
	to_designation: {
		label: "To Designation",
		type: String,
		optional: true
	},
	based_on: {
		label: "Based On",
		type: String,
		optional: true
	},
	system_role: {
		label: "System Role",
		type: String,
		optional: true
	},
	approving_role: {
		label: "Approving Role",
		type: String,
		optional: true
	}
});

this.AuthorizationRule.attachSchema(this.Schemas.AuthorizationRule);
