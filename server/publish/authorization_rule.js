Meteor.publish("authorization_rule_list", function(limit) {
	var defaultLimit = limit || 25;
	return AuthorizationRule.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("authorization_rule_empty", function() {
	return AuthorizationRule.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("authorization_rule_details", function(authorizationRuleId) {
	return AuthorizationRule.find({ _id: authorizationRuleId, ownerId: this.userId }, {});
});
