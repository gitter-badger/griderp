this.ShippingRuleCondition = new Mongo.Collection("shipping_rule_condition");

this.ShippingRuleCondition.userCanInsert = function(userId, doc) {
	return true;
}

this.ShippingRuleCondition.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.ShippingRuleCondition.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
}

this.Schemas = this.Schemas || {};

this.Schemas.ShippingRuleCondition = new SimpleSchema({
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
	to_value: {
		label: "To Value",
		type: Number,
		decimal: true,
		optional: true
	},
	from_value: {
		label: "From Value",
		type: Number,
		decimal: true,
		optional: true
	},
	shipping_amount: {
		label: "Shipping Amount",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.ShippingRuleCondition.attachSchema(this.Schemas.ShippingRuleCondition);
