Meteor.publish("shipping_rule_list", function(limit) {
	var defaultLimit = limit || 25;
	return ShippingRule.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("shipping_rule_empty", function() {
	return ShippingRule.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("shipping_rule_details", function(shippingRuleId) {
	return ShippingRule.find({ _id: shippingRuleId, ownerId: this.userId }, {});
});
