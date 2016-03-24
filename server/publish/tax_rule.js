Meteor.publish("tax_rule_list", function(limit) {
	var defaultLimit = limit || 25;
	return TaxRule.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("tax_rule_empty", function() {
	return TaxRule.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("tax_rule_details", function(taxRuleId) {
	return TaxRule.find({ _id: taxRuleId, ownerId: this.userId }, {});
});
