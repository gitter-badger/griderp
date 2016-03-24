Meteor.publish("currency_list", function(limit) {
	var defaultLimit = limit || 25;
	return Currency.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("currency_empty", function() {
	return Currency.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("currency_details", function(currencyId) {
	return Currency.find({ _id: currencyId, ownerId: this.userId }, {});
});
