Meteor.publish("currency_exchange_list", function(limit) {
	var defaultLimit = limit || 25;
	return CurrencyExchange.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("currency_exchange_empty", function() {
	return CurrencyExchange.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("currency_exchange_details", function(currencyExchangeId) {
	return CurrencyExchange.find({ _id: currencyExchangeId, ownerId: this.userId }, {});
});
