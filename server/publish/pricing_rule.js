Meteor.publish("pricing_rule_list", function(limit) {
	var defaultLimit = limit || 25;
	return PricingRule.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("pricing_rule_empty", function() {
	return PricingRule.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("pricing_rule_details", function(pricingRuleId) {
	return PricingRule.find({ _id: pricingRuleId, ownerId: this.userId }, {});
});
