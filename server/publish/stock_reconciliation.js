Meteor.publish("stock_reconciliation_list", function(limit) {
	var defaultLimit = limit || 25;
	return StockReconciliation.find({ ownerId: this.userId }, {limit: defaultLimit});
});

Meteor.publish("stock_reconciliation_empty", function() {
	return StockReconciliation.find({ _id: null, ownerId: this.userId }, {});
});

Meteor.publish("stock_reconciliation_details", function(stockReconciliationId) {
	return StockReconciliation.find({ _id: stockReconciliationId, ownerId: this.userId }, {});
});
