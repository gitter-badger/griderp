Meteor.publish("stock_entry_list", function(limit) {
	var defaultLimit = limit || 25;
	return StockEntry.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("stock_entry_empty", function() {
	return StockEntry.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("stock_entry_details", function(stockEntryId) {
	return StockEntry.find({ _id: stockEntryId, ownerId: this.userId }, {});
});
