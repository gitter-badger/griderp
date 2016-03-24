this.ShippingRuleCountry = new Mongo.Collection("shipping_rule_country");

this.ShippingRuleCountry.userCanInsert = function(userId, doc) {
	return true;
}

this.ShippingRuleCountry.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ShippingRuleCountry.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ShippingRuleCountry = new SimpleSchema({
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
	country: {
		label: "Country",
		type: String,
		optional: true
	}
});

this.ShippingRuleCountry.attachSchema(this.Schemas.ShippingRuleCountry);
