this.ShippingRule = new Mongo.Collection("shipping_rule");

this.ShippingRule.userCanInsert = function(userId, doc) {
	return true;
}

this.ShippingRule.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ShippingRule.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ShippingRule = new SimpleSchema({
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
	account: {
		label: "Account",
		type: String,
		optional: true
	},
	company: {
		label: "Company",
		type: String,
		optional: true
	},
	calculate_based_on: {
		label: "Calculate Based On",
		type: String,
		optional: true,
		defaultValue: "Net Total"
	},
	label: {
		label: "Label",
		type: String,
		optional: true
	},
	cost_center: {
		label: "Cost Center",
		type: String,
		optional: true
	}
});

this.ShippingRule.attachSchema(this.Schemas.ShippingRule);
