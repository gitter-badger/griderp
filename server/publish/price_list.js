Meteor.publish("price_list_list", function(limit) {
	var defaultLimit = limit || 25;
	return PriceList.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("price_list_empty", function() {
	return PriceList.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("price_list_details", function(priceListId) {
	return PriceList.find({ _id: priceListId, ownerId: this.userId }, {});
});
