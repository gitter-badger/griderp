Meteor.methods({

	removeStockReconciliation: function(docIds) {
		StockReconciliation.remove({"_id":{"$in":docIds}});
	}

});
